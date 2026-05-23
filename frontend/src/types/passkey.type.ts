export type IPasskey = {
  id: string;
  name: string;
  browser: string;
  os: string;
  deviceType: string;
  backedUp: boolean;
  createdAt: string;
  lastUsedAt: string | null;
};
