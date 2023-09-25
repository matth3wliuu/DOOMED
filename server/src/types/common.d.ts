import { Token } from '../jwt';

export interface AccountID {
  id: string;
}

export interface JwtToken {
  token: Token;
}
