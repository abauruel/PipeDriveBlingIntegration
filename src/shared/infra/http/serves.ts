import 'dotenv/config';
import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import '../typeorm';
import '../../container';

import routes from './routes';

import AppError from '../../errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => console.log('Server is running on 3333 PORT'));
