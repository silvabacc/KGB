import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import timestampRoutes from './routes/timestampRoutes';
import { getConfig } from './getConfig';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import userRoutes from './routes/userRoutes';
import systemRoutes from './routes/systemRoutes';

const { PORT } = getConfig();

const app = express();

app.set('port', PORT);

app.use(express.json());
app.use(cors());

app.use('/', systemRoutes);
app.use('/timestamp', timestampRoutes);
app.use('/user', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen({ port: PORT }, () => {
  console.log('Alive on port', PORT);
});
