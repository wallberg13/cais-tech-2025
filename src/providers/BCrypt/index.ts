import { compare, hash } from "bcrypt";

export class HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 9);
  }

  async compare(payload: string, hashed: string) {
    const isEqual = await compare(payload, hashed);

    return isEqual;
  }
}

export const hashProvider = new HashProvider();
