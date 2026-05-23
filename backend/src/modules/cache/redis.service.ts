import { redisClientConfig } from "@/config/redis";

class Service {
  private readonly client = redisClientConfig;

  private async set(key: string, value: any, ttlInSeconds?: number) {
    const stringValue = JSON.stringify(value);

    if (ttlInSeconds) {
      return this.client.set(key, stringValue, { EX: ttlInSeconds });
    }

    return this.client.set(key, stringValue);
  }

  private async get<T = any>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  private async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  private async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  private async expire(key: string, ttl: number): Promise<boolean> {
    return (await this.client.expire(key, ttl)) === 1;
  }

  private async lpush(key: string, value: any): Promise<number> {
    return this.client.lPush(key, JSON.stringify(value));
  }

  private async rpush(key: string, value: any): Promise<number> {
    return this.client.rPush(key, JSON.stringify(value));
  }

  private async lrange<T = any>(
    key: string,
    start = 0,
    stop = -1
  ): Promise<T[]> {
    const items = await this.client.lRange(key, start, stop);

    return items.map((item) => {
      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    });
  }

  private async ltrim(key: string, start: number, stop: number): Promise<void> {
    await this.client.lTrim(key, start, stop);
  }

  private async llen(key: string): Promise<number> {
    return this.client.lLen(key);
  }

  private async sIsMember(key: string, value: string): Promise<boolean> {
    return (await this.client.sIsMember(key, value)) === 1;
  }

  private async sRem(key: string, values: string[]): Promise<number> {
    return this.client.sRem(key, values);
  }

  private async sAdd(key: string, values: string[]): Promise<number> {
    const validValues = values
      .map((value) => String(value).trim())
      .filter((value) => value.length > 0);

    if (!validValues.length) return 0;

    return this.client.sAdd(key, validValues);
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

  async hasData(key: string): Promise<boolean> {
    return this.exists(key);
  }

  async setExpiration(key: string, ttlInSeconds: number): Promise<boolean> {
    return this.expire(key, ttlInSeconds);
  }

  async addItemToListStart(key: string, value: any): Promise<number> {
    return this.lpush(key, value);
  }

  async addItemToListEnd(key: string, value: any): Promise<number> {
    return this.rpush(key, value);
  }

  async getListItems<T = any>(key: string, start = 0, stop = -1): Promise<T[]> {
    return this.lrange<T>(key, start, stop);
  }

  async keepListItemsInRange(
    key: string,
    start: number,
    stop: number
  ): Promise<void> {
    return this.ltrim(key, start, stop);
  }

  async countListItems(key: string): Promise<number> {
    return this.llen(key);
  }

  async updateListItemById(
    key: string,
    id: string,
    updateItem: Record<string, any>
  ): Promise<boolean> {
    const items = await this.client.lRange(key, 0, -1);

    for (let i = 0; i < items.length; i++) {
      let parsed: any;

      try {
        parsed = JSON.parse(items[i]);
      } catch {
        continue;
      }

      if (String(parsed.id || parsed._id) === String(id)) {
        const updated = { ...parsed, ...updateItem };
        await this.client.lSet(key, i, JSON.stringify(updated));
        return true;
      }
    }

    return false;
  }

  async deleteListItemById(key: string, id: string): Promise<boolean> {
    const items = await this.client.lRange(key, 0, -1);

    for (let i = 0; i < items.length; i++) {
      let parsed: any;

      try {
        parsed = JSON.parse(items[i]);
      } catch {
        continue;
      }

      if (String(parsed.id || parsed._id) === String(id)) {
        const placeholder = `__deleted_placeholder__:${id}`;

        await this.client.lSet(key, i, placeholder);
        await this.client.lRem(key, 1, placeholder);

        return true;
      }
    }

    return false;
  }

  async isMemberOfSet(key: string, value: string): Promise<boolean> {
    return this.sIsMember(key, value);
  }

  async removeFromSet(key: string, values: string[]): Promise<number> {
    return this.sRem(key, values);
  }

  async addToSet(key: string, values: string[]): Promise<number> {
    return this.sAdd(key, values);
  }
}

export const RedisService = new Service();
