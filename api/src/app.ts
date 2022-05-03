import express from 'express';
import routes from './routes';

const app = express();

app.set('port', '4000');

app.use('/', routes);

app.listen({ port: 4000 }, () => {
  console.log('Alive');
});
