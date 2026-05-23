import BaseController from "@/shared/baseController";
import { Request, Response } from "express";
import { TwoFAService } from "./2fa.service";
import { HttpStatusCode } from "@/lib/httpStatus";
import { cookieManager } from "@/shared/cookie";

class Controller extends BaseController {
  setup2AfAuthenticator = this.catchAsync(
    async (req: Request, res: Response) => {
      const user = await TwoFAService.setup2AfAuthenticator(req.user?.id);

      this.sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        message: `User authenticated in successfully`,
        data: user,
      });
    }
  );

  verifyAuthenticator = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.id;
    const result = await TwoFAService.verifyAuthenticator(
      userId,
      req.body.token
    );
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Authenticator app enabled successfully",
      data: result,
    });
  };

  verifyLogin = this.catchAsync(async (req: Request, res: Response) => {
    const { access_token, refresh_token } = await TwoFAService.verifyLogin(
      req.user.id,
      req.body.code
    );
    cookieManager.setTokens(res, access_token, refresh_token);
    cookieManager.clearSingleToken(res, "requires_2fa");
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `User has logged in by 2 factor authenticator code successfully`,
      data: null,
    });
  });

  verifyCodeToLogin = this.catchAsync(async (req: Request, res: Response) => {
    const { access_token, refresh_token }: any =
      await TwoFAService.verifyCodeToLogin(req.user.id, req.body.code);

    if (access_token && refresh_token) {
      cookieManager.setTokens(res, access_token, refresh_token);
    }
    cookieManager.clearSingleToken(res, "requires_2fa");
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `User has logged in using recovery code successfully`,
      data: null,
    });
  });
}

export const TwoFAController = new Controller();
