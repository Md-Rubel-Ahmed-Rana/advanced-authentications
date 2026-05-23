import crypto from "crypto";

class Service {
  private adjectives = [
    "Rapid",
    "Silent",
    "Blue",
    "Golden",
    "Shadow",
    "Silver",
    "Bright",
    "Swift",
    "Crimson",
    "Iron",
  ];

  private nouns = [
    "Tiger",
    "Falcon",
    "River",
    "Phoenix",
    "Wolf",
    "Mountain",
    "Storm",
    "Dragon",
    "Forest",
    "Eagle",
  ];

  private formatCode(code: string) {
    return `${code.slice(0, 4)}-${code.slice(4, 8)}`;
  }

  private generateCode() {
    return crypto.randomBytes(8).toString("hex").toUpperCase();
  }

  private randomItem(items: string[]) {
    return items[Math.floor(Math.random() * items.length)];
  }

  private generateName() {
    return `${this.randomItem(this.adjectives)} ${this.randomItem(this.nouns)}`;
  }

  generateRecoveryCodes(length: number = 10): { name: string; code: string }[] {
    return Array.from({ length }, () => ({
      name: this.generateName(),
      code: this.formatCode(this.generateCode()),
    }));
  }
}

export const RecoveryCodeGenerator = new Service();
