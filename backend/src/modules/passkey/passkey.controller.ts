import BaseController from "@/shared/baseController";
import { Request, Response } from "express";
import { PasskeyService } from "./passkey.service";
import { HttpStatusCode } from "@/lib/httpStatus";
import { cookieManager } from "@/shared/cookie";
import { Types } from "mongoose";

class Controller extends BaseController {
  generatePasskeyRegisterOptions = this.catchAsync(
    async (req: Request, res: Response) => {
      const result = await PasskeyService.generatePasskeyRegisterOptions(
        req.user
      );
      this.sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        message: `Passkey register option generated successfully`,
        data: result,
      });
    }
  );

  verifyRegisterOption = this.catchAsync(
    async (req: Request, res: Response) => {
      const result = await PasskeyService.verifyRegisterOption(
        req.user?.id,
        req
      );
      this.sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        message: `Passkey register option verification completed`,
        data: result,
      });
    }
  );

  authenticateLogin = this.catchAsync(async (req: Request, res: Response) => {
    const result = await PasskeyService.authenticateLogin();
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `Passkey login verification completed`,
      data: result,
    });
  });

  verifyLoginOption = this.catchAsync(async (req: Request, res: Response) => {
    const { access_token, refresh_token } =
      await PasskeyService.verifyLoginOption(req.body);

    cookieManager.setTokens(res, access_token, refresh_token);

    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `Passkey login has been successful`,
      data: null,
    });
  });
  removePasskey = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await PasskeyService.removePasskey(id);
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `Passkey has been removed successfully`,
      data: null,
    });
  });
}

export const PasskeyController = new Controller();
