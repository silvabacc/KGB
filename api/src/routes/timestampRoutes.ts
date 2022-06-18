import { Router } from 'express';
import { frequencyHandler, timestampsHandler } from '../handler/timestampHandler';
import { validateFrequencyRoute, validateTimestampRoute } from '../validations/routeValidations';

const timestampRoutes = Router();

timestampRoutes.post('/', validateTimestampRoute, timestampsHandler);
timestampRoutes.get('/:frequency/:value', validateFrequencyRoute, frequencyHandler);

export default timestampRoutes;
