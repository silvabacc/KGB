import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes';
import { getConfig } from './getConfig';
import cors from 'cors';

const { PORT } = getConfig();

const app = express();

app.set('port', PORT);

app.use(express.json());
app.use(cors());

app.use('/', routes);

app.listen({ port: PORT }, () => {
  console.log('Alive');
});
