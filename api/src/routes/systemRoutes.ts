import { Router } from 'express';

const systemRoutes = Router();

systemRoutes.head('/healthcheck', (_req, res) => res.send('Service is up'));

export default systemRoutes;
