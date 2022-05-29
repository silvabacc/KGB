import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import defaultRoutes from './routes/default';
import { getConfig } from './getConfig';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import { v1 } from './routes/routes';
import v1Routes from './routes/v1';

const { PORT } = getConfig();

const app = express();

app.set('port', PORT);

app.use(express.json());
app.use(cors());

app.use('/', defaultRoutes);
app.use(v1, v1Routes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen({ port: PORT }, () => {
  console.log('Alive');
});
