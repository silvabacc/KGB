import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import defaultRoutes from './routes/default';
import { getConfig } from './getConfig';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';

const { PORT } = getConfig();

const app = express();

app.set('port', PORT);

app.use(express.json());
app.use(cors());

app.use('/', defaultRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen({ port: PORT }, () => {
  console.log('Alive');
});
