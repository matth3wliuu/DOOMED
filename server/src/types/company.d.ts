import type { Request } from 'express';
import type { JwtToken } from './common';

interface CompanyCredentials {
  email: string;
  password: string;
}

interface ProjectInfo {
  title: string;
  description: string;
  expiry: number;
}

export type CompanyRegisterRequest = Request<Record<string, never>, never, CompanyCredentials>;

export type CompanyLoginRequest = CompanyRegisterRequest;

export interface CreateProjectRequest
  extends Request<Record<string, never>, never, ProjectInfo>,
    JwtToken {}
