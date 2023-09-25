
import type { Request } from "express";
import { AccountID, JwtToken } from "./common";

export interface AuthorisationRequest extends Request, AccountID, JwtToken {}
