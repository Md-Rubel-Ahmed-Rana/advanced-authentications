import { Types } from "mongoose";

export type IPasskey = {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  deviceName?: string;
  browser?: string;
  browserVersion?: string;
  os?: string;
  osVersion?: string;
  deviceVendor?: string;
  deviceModel?: string;
  deviceType?: string;
  ipAddress?: string;
  lastUsedIP?: string;
  credentialID: string;
  publicKey: string;
  counter: number;
  transports?: string[];
  backedUp?: boolean;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserPasskey = {
  id: string;

  name: string;

  deviceType?: string;

  browser?: string;

  os?: string;

  backedUp?: boolean;

  createdAt: Date;

  lastUsedAt?: Date;

  current?: boolean;
};
