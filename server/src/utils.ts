import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { LogModule, Logger } from "./logging";

const LM = new LogModule('UTILS');

export enum Role {
  Professional,
  Company,
  Admin
}

interface ResponseWithStatus {
  msg: unknown;
  status: StatusCodes;
}

export const catchAndLogError = async (
  res: Response,
  func: () => Promise<ResponseWithStatus>,
  funcOnError: () => ResponseWithStatus,
  next?: NextFunction) => {
    let response: ResponseWithStatus;

    try {
      response = await func();
    }
    catch (e) {
      if (e instanceof Error) {
        Logger.Error(LM, `EXCEPTION: ${e.name} - ${e.message}\nSTACK:\n${e.stack}`);
      }
      response = funcOnError();
    }

    if (!res.headersSent) {
      if (response.msg === undefined) {
        res.sendStatus(response.status);
      }
      else {
        res.status(response.status).send(response.msg);
      }
    }
    else {
      Logger.Error(LM, 'Not performing any further action as headers are already sent.');
    }

    if (next) next();
}

export const saltRounds = 10;