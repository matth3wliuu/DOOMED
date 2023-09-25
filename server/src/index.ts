import express from 'express';

import { env } from './env';
import { companyLogin, companyRegister } from './company';
import { LogModule, Logger } from './logging';
import { authoriseCompany, devRouteGuard as devOnlyGuard } from './middlware';
import { CompanyLoginRequest } from './types/company';

const LM = new LogModule('INDEX');

const app = express();
app.use(express.json());

const port = env.SERVER_PORT;

app.post('/professional/register', (req, res, next) => {
  void (async () => {
    await companyRegister(req, res, next);
  })();
});

app.post('/professional/login', (req, res, next) => {
  void (async () => {
    await companyLogin(req, res, next);
  })();
});

/* Demo route
  1) Using the `authoriseCompany` middleware ensures `companyLogin` is called if
  and only if the user is using a company account
  2) Using the `devOnlyGuard` middleware ensures `companyLogin` is called if
  and only if the NODE_ENV environment variable is `development`
*/
app.get(
  `/example/authorised/route`,
  authoriseCompany,
  devOnlyGuard,
  (req: CompanyLoginRequest, res, next) => {
    void (async () => {
      await companyLogin(req, res, next);
    })();
  },
);

app.listen(port, () => {
  Logger.Info(LM, `Server is running on PORT=${port}`);
});
