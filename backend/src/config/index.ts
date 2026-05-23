import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const envConfig = {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    env: process.env.NODE_ENV as "development" | "production",
    name: process.env.APP_NAME || "Passkey && 2FA Authentication",
    origin: process.env.APP_ORIGIN as string,
    frontend_origin: process.env.FRONTEND_ORIGIN as string,
    encryption_key: process.env.ENCRYPTION_KEY as string,
  },
  cors_origins: process.env.CORS_ORIGINS
    ? (process.env.CORS_ORIGINS as string).split(", ")
    : [],
  database: {
    mongodb_url: process.env.MONGODB_URL as string,
  },
  jwt: {
    access_token_expires: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
    secret: process.env.JWT_TOKEN_SECRET as string,
    access_cookie_name:
      process.env.ACCESS_TOKEN_COOKIE_NAME || "myapp_auth_access_token",
    refresh_cookie_name:
      process.env.REFRESH_TOKEN_COOKIE_NAME || "myapp_auth_refresh_token",
  },
  redis: {
    password: process.env.REDIS_PASSWORD as string,
    host: process.env.REDIS_HOST as string,
    port: process.env.REDIS_PORT as string,
  },
  email: {
    host: process.env.MAIL_HOST as string,
    port: Number(process.env.MAIL_PORT) as number,
    user: process.env.MAIL_USER as string,
    pass: process.env.MAIL_PASS as string,
  },
};
