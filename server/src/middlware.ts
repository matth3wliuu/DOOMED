
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
    const jwtString = req.header('Authorization');
    if (!jwtString) {
      Logger.Error(LM, `Missing Authorization header from user with ACCOUNT_ID=${accountID}`);
      res.sendStatus(StatusCodes.FORBIDDEN);
      throw Error('Missing JWT token from request header');
    }

    if (!Jwt.verify(jwtString)) {
      Logger.Error(LM, `Failed to verify JWT token from USER with ACCOUNT_ID=${accountID}`);
      throw new Error('Invalid JWT token');
    }

    const jwt = Jwt.decode(jwtString);

    if (jwt.role !== role) {
      Logger.Error(LM, `User with ACCOUNT_ID attempted to authorise with incorrect role`);
      throw new Error('Incorrect role');
    }

    // give user back a new token with a refreshed expiry
    req.token = Jwt.decode(Jwt.sign(accountID, role));

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
