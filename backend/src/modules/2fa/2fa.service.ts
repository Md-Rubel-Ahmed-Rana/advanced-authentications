import { envConfig } from "@/config/index";
import speakeasy from "speakeasy";
import { UserModel } from "../users/users.model";
import ApiError from "@/middlewares/error";
import { HttpStatusCode } from "@/lib/httpStatus";
import QRCode from "qrcode";
import { CryptoInstance } from "@/lib/crypto";
import { JwtInstance } from "@/lib/jwt";
import { RecoveryCodeService } from "../recovery-cdoe/recovery-code.service";
import { Types } from "mongoose";

class Service {
  async setup2AfAuthenticator(
    userId: string
  ): Promise<{ secret: string; otpauth_url: string; qr_code: string }> {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        "User was not found to setup 2AF authenticator"
      );
    }
    const secret = speakeasy.generateSecret({
      name: envConfig.app.name,
    });

    const qr_code = await QRCode.toDataURL(secret.otpauth_url!);

    user.two_factor_secret = CryptoInstance.encrypt(secret.base32);

    await user.save();

    console.log({
      secret: secret.base32,
      otpauth_url: secret.otpauth_url!,
      qr_code,
    });

    return {
      secret: secret.base32,
      otpauth_url: secret.otpauth_url!,
      qr_code,
    };
  }

  async verifyAuthenticator(
    userId: string,
    token: string
  ): Promise<{
    two_factor_enabled: boolean;
    recovery_codes: {
      name: string;
      code: string;
    }[];
  }> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "User was not found");
    }

    if (!user.two_factor_secret) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Authenticator setup was not initialized"
      );
    }

    if (user.two_factor_enabled) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Authenticator is already enabled"
      );
    }

    const decryptedSecret = CryptoInstance.decrypt(user.two_factor_secret);

    const verified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: "base32",
      token: token,
      window: 1,
    });

    if (!verified) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Invalid verification code"
      );
    }

    user.two_factor_enabled = true;

    user.two_factor_verified_at = new Date();

    await user.save();

    // generate recovery code and send to client to show
    const recoveryCodes = await RecoveryCodeService.create(user._id);

    return {
      two_factor_enabled: true,
      recovery_codes: recoveryCodes,
    };
  }

  async verifyLogin(userId: string, code: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, "User was not found");
    }

    if (!user.two_factor_secret) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Authenticator setup was not initialized"
      );
    }

    const decryptedSecret = CryptoInstance.decrypt(user.two_factor_secret);

    const verified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: "base32",
      token: code,
      window: 1,
    });

    if (!verified) {
      throw new ApiError(
        HttpStatusCode.BAD_REQUEST,
        "Invalid verification code"
      );
    }

    return JwtInstance.generateTokens({
      id: user?._id,
      email: user.email,
    });
  }

  async verifyCodeToLogin(userId: Types.ObjectId, inputCode: string) {
    return await RecoveryCodeService.verifyCodeToLogin(userId, inputCode);
  }
}

export const TwoFAService = new Service();
