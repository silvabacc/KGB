import { Router } from 'express';
import { handler } from './handler/handler';
import { validateTimestampRoute } from './validations/timestampRouteValidation';

const router = Router();

router.post('/timestamp', validateTimestampRoute, handler);

export default router;
