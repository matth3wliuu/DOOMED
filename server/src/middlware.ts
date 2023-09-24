
import { Response, NextFunction } from "express";
import { AuthorisationRequest } from "./types/middleware";
import { StatusCodes } from "http-status-codes";
import { LogModule, Logger } from "./logging";
import { Jwt } from "./jwt";
import { Role } from "./utils";
import { env } from "./env";

const LM = new LogModule('MIDDLEWARE');

export const authoriseCompany = (req: AuthorisationRequest, res: Response, next: NextFunction) => {
  authorise(req, res, next, Role.Company);
}

export const authoriseProfessional = (req: AuthorisationRequest, res: Response, next: NextFunction) => {
  authorise(req, res, next, Role.Professional);
}

export const authoriseAdmin = (req: AuthorisationRequest, res: Response, next: NextFunction) => {
  authorise(req, res, next, Role.Admin);
}

const authorise = (req: AuthorisationRequest, res: Response, next: NextFunction, role: Role) => {
  const accountID = req.id;

  try {
    const header = req.header('Authorization');
    if (!header) {
      Logger.Error(LM, `Missing Authorization header from user with ACCOUNT_ID=${accountID}`);
      res.sendStatus(StatusCodes.FORBIDDEN);
    }

    const jwt = Jwt.decode(header as string);
    if (jwt.role !== role) {
      Logger.Error(LM, `User with ACCOUNT_ID attempted to authorise with incorrect role`);
      throw new Error('Incorrect role');
    }

    req.jwtString = Jwt.sign(accountID, role);

    next();
  }
  catch (e) {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
    Logger.Error(LM, `Failed to authorise user with ACCOUNT_ID=${accountID}`);
  }
}

export const devRouteGuard = (req: unknown, res: Response, next: NextFunction) => {
  if (env.NODE_ENV === 'development') {
    next();
  }
}
