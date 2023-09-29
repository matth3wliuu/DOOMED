import { Token } from '../jwt';

export interface AccountID {
  id: string;
}

export interface JwtToken {
  token: Token;
}

export enum ProfessionalAvailability {
  Available = 0,
  Unavailable
}

export enum ProjectWorkMode {
  Hybrid = 0,
  Onsite,
  Online,
}