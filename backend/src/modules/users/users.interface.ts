import { Document } from "mongoose";

export type IUser = {
  _id: string;
  name: string;
  email: string;
  two_factor_secret: string;
  two_factor_enabled: boolean;
  two_factor_verified_at: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: any;
} & Document;

export type ICreateUser = {
  name: string;
  email: string;
  password: string;
};
