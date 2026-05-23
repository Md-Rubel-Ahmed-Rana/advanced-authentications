import { Schema, model } from "mongoose";
import { IRecoveryCode } from "./recovery-code.interface";
import { schemaOptions } from "@/utils/schemaOptions";

const recoveryCodeSchema = new Schema<IRecoveryCode>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    code_hash: {
      type: String,
      required: true,
    },

    is_used: {
      type: Boolean,
      default: false,
      index: true,
    },

    used_at: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

recoveryCodeSchema.index({
  user: 1,
  is_used: 1,
});

export const RecoveryCodeModel = model("RecoveryCode", recoveryCodeSchema);
