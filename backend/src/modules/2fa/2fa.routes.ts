import { JwtInstance } from "@/lib/jwt";
import validateRequest from "@/middlewares/validateRequest";
import { Router } from "express";
import { verifyAuthenticatorSchema } from "./2fa.validate";
import { TwoFAController } from "./2fa.controller";

const router = Router();

router.post(
  "/setup",
  JwtInstance.authenticate(),
  TwoFAController.setup2AfAuthenticator
);

router.post(
  "/verify",
  JwtInstance.authenticate(),
  validateRequest(verifyAuthenticatorSchema),
  TwoFAController.verifyAuthenticator
);

router.post(
  "/login",
  JwtInstance.verify2FaToken(),
  TwoFAController.verifyLogin
);

router.post(
  "/login/code",
  JwtInstance.verify2FaToken(),
  TwoFAController.verifyCodeToLogin
);

export const TwoFARoutes = router;
