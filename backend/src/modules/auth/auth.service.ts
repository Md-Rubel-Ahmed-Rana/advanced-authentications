import { BcryptInstance } from "@/lib/bcrypt";
import { IUser } from "../users/users.interface";
import { UserService } from "../users/users.service";
import { ILoginCredential } from "@/interfaces/common.interface";
import { UserModel } from "../users/users.model";
import ApiError from "@/middlewares/error";
import { HttpStatusCode } from "@/lib/httpStatus";
import { JwtInstance } from "@/lib/jwt";
import { Types } from "mongoose";
import { RecoveryCodeService } from "../recovery-cdoe/recovery-code.service";
import { PasskeyService } from "../passkey/passkey.service";

class Service {
  async register(data: IUser) {
    data.password = await BcryptInstance.hash(data.password);
    await UserService.create(data);
  }

  async login(data: ILoginCredential) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "User was not found");
    }

    const isPasswordMatched = await BcryptInstance.compare(
      data.password,
      user.password
    );

    if (!isPasswordMatched) {
      throw new ApiError(
        HttpStatusCode.UNAUTHORIZED,
        "Invalid email or password"
      );
    }

    if (user.two_factor_enabled) {
      const tempToken = await JwtInstance.generateTokens({
        id: user._id,
        type: "2fa_pending",
      });

      return {
        requires_2fa: true,
        temp_token: tempToken.access_token,
      };
    }

    const tokens = await JwtInstance.generateTokens({
      id: user?._id,
      email: user.email,
    });

    return tokens;
  }

  async getLoggedInUser(id: Types.ObjectId) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "User was not found");
    }

    const passkeyInfo = await PasskeyService.getPasskeysByUser(user._id);
    const finalResponse = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      two_factor: {
        is_enabled: user.two_factor_enabled,
        recovery_codes: await RecoveryCodeService.getUserCodes(user._id),
      },
      passkey: {
        has_passkey: passkeyInfo.has_passkey,
        passkeys: passkeyInfo.passkeys || [],
      },
    };

    return finalResponse;
  }
}

export const AuthService = new Service();
