
import type { Request } from "express";

export type CompanyRegisterRequest = Request<Record<string, never>, never, {
  email: string,
  password: string
}>;

export type CompanyLoginRequest = CompanyRegisterRequest;