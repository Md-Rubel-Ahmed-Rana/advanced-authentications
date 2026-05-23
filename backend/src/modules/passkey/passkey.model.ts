import { model, Schema } from "mongoose";
import { IPasskey } from "./passkey.interface";
import { schemaOptions } from "@/utils/schemaOptions";

const passkeySchema = new Schema<IPasskey>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    deviceName: {
      type: String,
      default: "Passkey",
    },
    browser: {
      type: String,
      default: null,
    },
    browserVersion: {
      type: String,
      default: null,
    },
    deviceModel: {
      type: String,
      default: null,
    },
    os: {
      type: String,
      default: null,
    },
    osVersion: {
      type: String,
      default: null,
    },
    deviceVendor: {
      type: String,
      default: null,
    },
    credentialID: {
      type: String,
      required: true,
      unique: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    counter: {
      type: Number,
      required: true,
      default: 0,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    lastUsedIP: {
      type: String,
      required: true,
    },
    transports: {
      type: [String],
      default: [],
    },
    deviceType: {
      type: String,
    },
    backedUp: {
      type: Boolean,
      default: false,
    },
    lastUsedAt: {
      type: Date,
      default: null,
    },
  },
  schemaOptions
);

export const PasskeyModel = model<IPasskey>("Passkey", passkeySchema);
