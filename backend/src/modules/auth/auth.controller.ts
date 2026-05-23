import BaseController from "@/shared/baseController";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { HttpStatusCode } from "@/lib/httpStatus";
import { cookieManager } from "@/shared/cookie";

class Controller extends BaseController {
  register = this.catchAsync(async (req: Request, res: Response) => {
    await AuthService.register(req.body);
    this.sendResponse(res, {
      statusCode: HttpStatusCode.CREATED,
      success: true,
      message: `Your account has been created successfully`,
      data: null,
    });
  });

  login = this.catchAsync(async (req: Request, res: Response) => {
    const result: any = await AuthService.login(req.body);
    if (result?.requires_2fa) {
      cookieManager.setSingleToken(res, "requires_2fa", result.temp_token);
      return this.sendResponse(res, {
        statusCode: HttpStatusCode.OK,
        success: true,
        message: `2FA authentication required`,
        data: result,
      });
    }

    const { access_token, refresh_token } = result;
    cookieManager.setTokens(res, access_token, refresh_token);

    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `User has logged in successfully`,
      data: null,
    });
  });

  getLoggedInUser = this.catchAsync(async (req: Request, res: Response) => {
    const user = await AuthService.getLoggedInUser(req.user?.id);

    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `User authenticated in successfully`,
      data: user,
    });
  });

  logout = this.catchAsync(async (req: Request, res: Response) => {
    cookieManager.clearTokens(res);
    this.sendResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: `User logged out successfully`,
      data: null,
    });
  });
}

export const AuthController = new Controller();
