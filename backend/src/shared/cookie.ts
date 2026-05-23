import { Response } from "express";

class CookieManager {
  private readonly accessTokenName = "passkey_2f2_auth_access_token";
  private readonly refreshTokenName = "passkey_2f2_auth_refresh_token";

  private cookieOptions = {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  };

  private clearCookieOptions = {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
  };

  public setTokens(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    res.cookie(this.accessTokenName, accessToken, this.cookieOptions);
    res.cookie(this.refreshTokenName, refreshToken, this.cookieOptions);
  }
  public setSingleToken(res: Response, tokenName: string, token: string): void {
    res.cookie(tokenName, token, this.cookieOptions);
  }

  public clearSingleToken(res: Response, tokenName: string): void {
    res.clearCookie(tokenName, this.clearCookieOptions);
  }

  public clearTokens(res: Response): void {
    res.clearCookie(this.accessTokenName, this.clearCookieOptions);
    res.clearCookie(this.refreshTokenName, this.clearCookieOptions);
  }
}

export const cookieManager = new CookieManager();
