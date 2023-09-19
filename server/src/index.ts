import express from 'express';

import { env } from './env';

const app = express();
const port = env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server is running on PORT=${port}`);
});
