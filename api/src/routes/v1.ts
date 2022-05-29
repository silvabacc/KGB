import { Router } from 'express';
import { frequencyHandler } from '../handler/timestampHandler';
import { validateFrequencyRoute } from '../validations/routeValidations';

const v1Routes = Router();

v1Routes.get('/timestamp/:frequency/:value', validateFrequencyRoute, frequencyHandler);

export default v1Routes;
