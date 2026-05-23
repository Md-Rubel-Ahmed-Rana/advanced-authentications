import { Router } from "express";
import { PasskeyController } from "./passkey.controller";
import { JwtInstance } from "@/lib/jwt";

const router = Router();

router.post(
  "/register/options",
  JwtInstance.authenticate(),
  PasskeyController.generatePasskeyRegisterOptions
);

router.post(
  "/register/verify",
  JwtInstance.authenticate(),
  PasskeyController.verifyRegisterOption
);

router.post("/login/options", PasskeyController.authenticateLogin);

router.post("/login/verify", PasskeyController.verifyLoginOption);

router.delete("/:id/remove", PasskeyController.removePasskey);

export const PasskeyRoutes = router;
