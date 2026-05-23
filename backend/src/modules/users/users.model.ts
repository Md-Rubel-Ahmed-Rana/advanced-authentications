import { Schema, model } from "mongoose";
import { IUser } from "./users.interface";
import { schemaOptions } from "@/utils/schemaOptions";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    two_factor_secret: {
      type: String,
      default: null,
    },
    two_factor_enabled: { type: Boolean, default: false },
    two_factor_verified_at: { type: Date, default: null },
    password: { type: String, required: true },
  },
  schemaOptions
);

export const UserModel = model<IUser>("User", userSchema);
