import type { Request } from 'express';
import type { JwtToken, ProjectWorkMode } from './common';

interface CompanyCredentials {
  email: string;
  password: string;
}

interface ProjectInfo {
  title: string;
  description: string;
  capacity: number;
  roles: string;
  pay: number;
  workMode: ProjectWorkMode;
  start: number;
  end: number;
}

export type CompanyRegisterRequest = Request<Record<string, never>, never, CompanyCredentials>;

export type CompanyLoginRequest = CompanyRegisterRequest;

export interface CreateProjectRequest
  extends Request<Record<string, never>, never, ProjectInfo>,
    JwtToken {}
