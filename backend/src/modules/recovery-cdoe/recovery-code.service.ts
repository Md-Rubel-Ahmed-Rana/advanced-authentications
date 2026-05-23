import { BcryptInstance } from "@/lib/bcrypt";
import { RecoveryCodeGenerator } from "@/lib/recoveryCode";
import { Types } from "mongoose";
import { RecoveryCodeModel } from "./recovery-code.model";
import { IGetRecoveryCode } from "./recovery-code.interface";
import { JwtInstance } from "@/lib/jwt";
import ApiError from "@/middlewares/error";
import { HttpStatusCode } from "@/lib/httpStatus";

class Service {
  async create(user: Types.ObjectId) {
    const items = RecoveryCodeGenerator.generateRecoveryCodes();

    const hashedCodes = await Promise.all(
      items.map(async (item) => {
        const hashedCode = await BcryptInstance.hash(item.code);

        return {
          code_hash: hashedCode,
          name: item.name,
          user,
        };
      })
    );

    await RecoveryCodeModel.insertMany(hashedCodes);

    // Return RAW codes only once
    return items.map((item) => ({
      name: item.name,
      code: item.code,
    }));
  }

  async getUserCodes(userId: Types.ObjectId): Promise<IGetRecoveryCode[]> {
    const result = await RecoveryCodeModel.find({ user: userId });

    return result.map((item) => ({
      id: item._id,
      is_used: item.is_used,
      name: item.name,
      used_at: item.used_at,
    }));
  }

  async verifyCodeToLogin(
    userId: Types.ObjectId,
    inputCode: string
  ): Promise<{ access_token: string; refresh_token: string }> {
    const recoveryCodes = await RecoveryCodeModel.find({
      user: userId,
      is_used: false,
    }).populate("user", "email");

    let matchedCode: any = null;

    for (const recoveryCode of recoveryCodes) {
      const matched = await BcryptInstance.compare(
        inputCode,
        recoveryCode.code_hash
      );

      if (matched) {
        matchedCode = recoveryCode;
        break;
      }
    }

    if (!matchedCode) {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        "Invalid recovery code. Please try again"
      );
    }

    matchedCode.is_used = true;
    matchedCode.used_at = new Date();
    await matchedCode.save();

    const user: any = matchedCode.user;

    return await JwtInstance.generateTokens({
      id: user._id,
      email: user.email,
    });
  }
}

export const RecoveryCodeService = new Service();
