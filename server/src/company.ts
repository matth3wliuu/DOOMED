import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import { CompanyLoginRequest, CompanyRegisterRequest, CreateProjectRequest } from './types/company';
import { saltRounds, catchAndLogError, Role } from './utils';
import { LogModule, Logger } from './logging';
import { db } from './db/connection';
import { companies, companyAccounts } from './db/schema/company';
import { projects } from './db/schema/project';
import { StatusCodes } from 'http-status-codes';
import { Jwt } from './jwt';

const LM = new LogModule('COMPANY');

export const companyRegister = async (
  req: CompanyRegisterRequest,
  res: Response,
  next: NextFunction,
) => {
  await catchAndLogError(
    res,
    async () => {
      const { email, password } = req.body;

      Logger.Info(LM, `Attempting to register a company with EMAIL=${email}`);

      const search = await db
        .select()
        .from(companyAccounts)
        .where(eq(companyAccounts.email, email));

      if (search.length != 0) {
        Logger.Error(LM, `Company with EMAIL=${email} already exists`);
        return { status: StatusCodes.CONFLICT, msg: undefined };
      }

      const hashed = await bcrypt.hash(password, saltRounds);

      const insertedCompany = await db.insert(companies).values({}).returning({ id: companies.id });

      await db.insert(companyAccounts).values({
        email: email,
        hashedPassword: hashed,
        companyId: insertedCompany[0].id,
      });

      // TODO (matt): send confirmation email to company

      Logger.Info(LM, `Successfully registered company with EMAIL=${email}`);

      return { status: StatusCodes.OK, msg: undefined };
    },
    () => ({ status: StatusCodes.BAD_REQUEST, msg: undefined }),
    next,
  );
};

export const companyLogin = async (req: CompanyLoginRequest, res: Response, next: NextFunction) => {
  await catchAndLogError(
    res,
    async () => {
      const { email, password } = req.body;

      Logger.Info(LM, `Company with EMAIL=${email} attempting to login`);

      const search = await db
        .select()
        .from(companyAccounts)
        .where(eq(companyAccounts.email, email));

      if (search.length == 0) {
        Logger.Error(LM, `Company with EMAIL=${email} does not exists`);
      } else if (search.length > 0) {
        const company = search[0];

        const hashCheck = await bcrypt.compare(password, company.hashedPassword);
        if (!hashCheck) {
          throw new Error(
            `Failed to authenticate company with EMAIL=${email} due to invalid credentials`,
          );
        }
        Logger.Info(LM, `Successfully authenticated company with EMAIL=${email}`);

        const token = Jwt.sign(company.id.toString(), Role.Company);

        return { status: StatusCodes.OK, msg: { token } };
      }

      return { status: StatusCodes.INTERNAL_SERVER_ERROR, msg: undefined };
    },
    () => ({ status: StatusCodes.BAD_REQUEST, msg: undefined }),
    next,
  );
};

export const createProject = async (
  req: CreateProjectRequest,
  res: Response,
  next: NextFunction,
) => {
  await catchAndLogError(
    res,
    async () => {
      const token = req.token;
      const accountID = token.id;
      const { title, description, capacity, roles, pay, workMode, start, end } = req.body;

      Logger.Info(LM, `Company with ID=${accountID} attempting to create a new project`);

      const startDate = new Date(start);
      const endDate = new Date(end);

      const insertedProject = await db
        .insert(projects)
        .values({
          companyId: parseInt(accountID),
          title: title,
          description: description,
          capacity: capacity,
          roles: roles,
          pay: pay,
          workMode: workMode,
          start: startDate,
          end: endDate,
        })
        .returning({ projectId: projects.id });

      const projectId = insertedProject[0].projectId;
      Logger.Info(
        LM,
        `Successfully created new project with ID=${projectId} for company with ID=${accountID}`,
      );

      return { status: StatusCodes.OK, msg: { token } };
    },
    () => ({ status: StatusCodes.BAD_REQUEST, msg: undefined }),
    next,
  );
};
