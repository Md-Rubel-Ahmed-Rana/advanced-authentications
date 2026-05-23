import { Router } from "express";
import { AuthController } from "./auth.controller";
import { JwtInstance } from "@/lib/jwt";
import { PasskeyRoutes } from "../passkey/passkey.routes";
import { TwoFARoutes } from "../2fa/2fa.routes";

const router = Router();

router.use("/passkeys", PasskeyRoutes);

router.use("/2fa", TwoFARoutes);

router.post("/register", AuthController.register);

router.post("/login", AuthController.login);

router.delete("/logout", AuthController.logout);

router.get("/", JwtInstance.authenticate(), AuthController.getLoggedInUser);

export const AuthRoutes = router;
