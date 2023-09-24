import { env } from './env';
import { Role } from './utils';
import jwt from 'jsonwebtoken';

export interface Token {
  id: string,
  role: Role,
  lastRequestTimestemp: number;
}

export class Jwt {
  private static secret = env.JWT_SECRET;

  // TODO (matt): experiment with syntax for 30 minute duration
  private static duration = '1h';

  public static sign(id: string, role: Role) {
    const payload: Token = {
      id: id,
      role: role,
      lastRequestTimestemp: Date.now(),
    };
    return jwt.sign(payload, Jwt.secret, { expiresIn: Jwt.duration });
  }

  public static decode(token: string) {
    return jwt.decode(token) as Token;
  }
}