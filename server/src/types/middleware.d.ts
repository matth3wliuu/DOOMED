
import type { Request } from "express";
import { AccountID, JwtString } from "./common";

export interface AuthorisationRequest extends Request, AccountID, JwtString {}
