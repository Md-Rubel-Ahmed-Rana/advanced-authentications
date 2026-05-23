import { envConfig } from "@/config/index";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { decodeClientDataJSON } from "@simplewebauthn/server/helpers";
import { JwtPayload } from "jsonwebtoken";
import { RedisService } from "../cache/redis.service";
import { PasskeyModel } from "./passkey.model";
import ApiError from "@/middlewares/error";
import { HttpStatusCode } from "@/lib/httpStatus";
import { UAParser } from "ua-parser-js";
import { Request } from "express";
import { JwtInstance } from "@/lib/jwt";
import { Types } from "mongoose";
import { IUserPasskey } from "./passkey.interface";

class Service {
  async generatePasskeyRegisterOptions(
    payload: JwtPayload
  ): Promise<PublicKeyCredentialCreationOptionsJSON> {
    const existingPasskeys = await PasskeyModel.find({
      user: payload.id,
    }).lean();

    const excludeCredentials: any = existingPasskeys.map((p) => ({
      id: p.credentialID,
      type: "public-key" as const,
      transports: p.transports || [],
    }));

    const options = await generateRegistrationOptions({
      rpName: envConfig.app.name,

      rpID: envConfig.app.origin,

      userID: new TextEncoder().encode(payload.id.toString()),

      userName: payload.email,

      attestationType: "none",
      excludeCredentials,

      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred",
      },
    });

    const result = await RedisService.saveData(
      `passkey-register:${payload.id}`,
      options.challenge,
      1000
    );

    console.log({ result, id: payload.id });

    return options;
  }

  async verifyRegisterOption(userId: string, req: Request) {
    try {
      const expectedChallenge = await RedisService.getData(
        `passkey-register:${userId}`
      );

      console.log({ expectedChallenge });

      const { verified, registrationInfo } = await verifyRegistrationResponse({
        response: req.body,
        expectedChallenge,
        expectedOrigin: envConfig.app.frontend_origin,
        expectedRPID: envConfig.app.origin,
      });

      if (verified && registrationInfo) {
        const { credential, credentialDeviceType, credentialBackedUp } =
          registrationInfo;

        const deviceInfo = this.extractDeviceInfo(req);

        const payload = {
          ...deviceInfo,
          user: userId,
          credentialID: credential.id,
          publicKey: Buffer.from(credential.publicKey).toString("base64"),
          counter: credential.counter,
          deviceType: credentialDeviceType,
          backedUp: credentialBackedUp,
          transports: req.body.response.transports || [],
        };

        await PasskeyModel.create(payload);
      } else {
        console.log("Registration passkey verification failed");
        throw new ApiError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          "Registration passkey verification failed"
        );
      }
    } catch (error: any) {
      console.log("Registration passkey verification failed");
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        error.message || "Registration passkey verification failed"
      );
    }
  }

  async authenticateLogin(): Promise<PublicKeyCredentialRequestOptionsJSON> {
    const options = await generateAuthenticationOptions({
      rpID: envConfig.app.origin,
      userVerification: "preferred",
    });

    await RedisService.saveData(
      `passkey-login:${options.challenge}`,
      options.challenge,
      1000
    );

    return options;
  }

  async verifyLoginOption(body: any) {
    const passkey = await PasskeyModel.findOne({
      credentialID: body.id,
    }).populate("user", "email");

    if (!passkey) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        "No passkey is registered for this account."
      );
    }

    const credential: any = {
      id: passkey.credentialID,

      publicKey: Buffer.from(passkey.publicKey, "base64"),

      counter: passkey.counter,

      transports: passkey.transports,
    };

    // decode challenge from clientDataJSON
    const clientData = decodeClientDataJSON(body.response.clientDataJSON);

    const challenge = clientData.challenge;

    const expectedChallenge = await RedisService.getData(
      `passkey-login:${challenge}`
    );

    const verification = await verifyAuthenticationResponse({
      response: body,

      expectedChallenge,

      expectedOrigin: envConfig.app.frontend_origin,

      expectedRPID: envConfig.app.origin,

      credential,
    });

    const { verified, authenticationInfo } = verification;

    if (verified && authenticationInfo) {
      await PasskeyModel.findByIdAndUpdate(passkey._id, {
        counter: authenticationInfo.newCounter,

        lastUsedAt: new Date(),
      });

      // issue tokens here
      const user: any = passkey.user;
      return await JwtInstance.generateTokens({
        id: user?._id,
        email: user.email,
      });
    } else {
      throw new ApiError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        "Passkey login has failed. Please try again"
      );
    }
  }

  private extractDeviceInfo(req: Request) {
    const parser = new UAParser(req.headers["user-agent"]);

    const result = parser.getResult();

    const browser = result.browser.name || "Unknown Browser";

    const browserVersion = result.browser.version || "";

    const os = result.os.name || "Unknown OS";

    const osVersion = result.os.version || "";

    const deviceVendor = result.device.vendor || "";

    const deviceModel = result.device.model || "";

    const deviceType = result.device.type || "desktop";

    const deviceName = [browser, browserVersion, "on", os, osVersion]
      .filter(Boolean)
      .join(" ");

    const forwardedFor = req.headers["x-forwarded-for"] as string;

    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.socket.remoteAddress || "";

    return {
      browser,
      browserVersion,

      os,
      osVersion,

      deviceVendor,
      deviceModel,
      deviceType,

      deviceName,

      ipAddress,
      lastUsedIP: ipAddress,
    };
  }

  async getPasskeysByUser(userId: Types.ObjectId): Promise<{
    has_passkey: boolean;
    passkeys: IUserPasskey[];
  }> {
    const result = await PasskeyModel.find(
      { user: userId },
      {
        deviceName: 1,
        browser: 1,
        os: 1,
        deviceType: 1,
        backedUp: 1,
        createdAt: 1,
        lastUsedAt: 1,
      }
    )
      .sort({ createdAt: -1 })
      .lean();

    return {
      has_passkey: result.length > 0,

      passkeys: result.map((passkey) => ({
        id: passkey._id.toString(),

        name:
          passkey.deviceName ||
          `${passkey.browser || "Unknown Browser"} on ${
            passkey.os || "Unknown OS"
          }`,

        browser: passkey.browser,

        os: passkey.os,

        deviceType: passkey.deviceType,

        backedUp: passkey.backedUp,

        createdAt: passkey.createdAt,

        lastUsedAt: passkey.lastUsedAt,
      })),
    };
  }

  async removePasskey(id: Types.ObjectId) {
    const passkey = await PasskeyModel.findByIdAndDelete(id);
    if (!passkey) {
      throw new ApiError(
        HttpStatusCode.NOT_FOUND,
        "Passkey was not found to remove"
      );
    }
  }
}

export const PasskeyService = new Service();
