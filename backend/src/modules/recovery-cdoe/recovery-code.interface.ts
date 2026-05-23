import { Types } from "mongoose";

export type IRecoveryCode = {
  user: Types.ObjectId;
  name: string;
  code_hash: string;
  is_used: boolean;
  used_at: Date;
};

export type IGetRecoveryCode = {
  id: Types.ObjectId;
  name: string;
  is_used: boolean;
  used_at: Date | null;
};
