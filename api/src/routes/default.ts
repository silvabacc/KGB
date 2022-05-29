import { Router } from 'express';
import { frequencyHandler, timestampsHandler } from '../handler/timestampHandler';
import { validateFrequencyRoute, validateTimestampRoute } from '../validations/routeValidations';

const defaultRoutes = Router();

defaultRoutes.post('/timestamp', validateTimestampRoute, timestampsHandler);
defaultRoutes.get('/timestamp/:frequency/:value', validateFrequencyRoute, frequencyHandler);

export default defaultRoutes;
