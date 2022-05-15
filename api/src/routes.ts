import { Router } from 'express';
import { frequencyHandler, timestampsHandler } from './handler/handler';
import { validateFrequencyRoute, validateTimestampRoute } from './validations/routeValidations';

const router = Router();

router.post('/timestamp', validateTimestampRoute, timestampsHandler);
router.get('/timestamp/:frequency/:value', validateFrequencyRoute, frequencyHandler);

export default router;
