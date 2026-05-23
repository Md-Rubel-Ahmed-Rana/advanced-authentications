import { AuthRoutes } from "@/modules/auth/auth.routes";
import { Router } from "express";

const router = Router();

const routes: { path: string; route: Router }[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export const PublicRoutes = router;
