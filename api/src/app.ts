import express from 'express';
import routes from './routes';
import { getConfig } from '../../src/config/getConfig';

const { PORT } = getConfig();

const app = express();

app.set('port', PORT);

app.use(express.json());

app.use('/', routes);

app.listen({ port: PORT }, () => {
  console.log('Alive');
});