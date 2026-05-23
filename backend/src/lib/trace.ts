import { CryptoInstance } from "./crypto";

class Service {
  generateAPIRequestTraceId(): string {
    return CryptoInstance.generateAPIRequestTraceId();
  }
}

export const TraceService = new Service();
