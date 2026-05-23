import { redisClientConfig } from "@/config/redis";
// RedisService
class Service {
  private readonly client = redisClientConfig;
  constructor() {
    this.client = redisClientConfig;
  }

  private async ensureConnection() {
    // already connected and ready
    if (this.client.isOpen && this.client.isReady) {
      return;
    }

    console.log("♻️ Reconnecting Redis...");

    await this.client.connect();
  }

  private async set(key: string, value: any, ttlInSeconds?: number) {
    await this.ensureConnection();

    const stringValue = JSON.stringify(value);

    if (ttlInSeconds) {
      return this.client.set(key, stringValue, { EX: ttlInSeconds });
    }

    return this.client.set(key, stringValue);
  }

  private async get<T = any>(key: string): Promise<T | null> {
    await this.ensureConnection();

    const data = await this.client.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  private async delete(key: string): Promise<number> {
    await this.ensureConnection();

    return this.client.del(key);
  }

  // -------------------------
  // Public methods
  // -------------------------
  async saveData(key: string, value: any, ttlInSeconds?: number) {
    return this.set(key, value, ttlInSeconds);
  }

  async getData<T = any>(key: string): Promise<T | null> {
    return this.get<T>(key);
  }

  async deleteData(key: string): Promise<boolean> {
    return (await this.delete(key)) > 0;
  }
}

export const RedisService = new Service();
