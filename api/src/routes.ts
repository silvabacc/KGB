import { Router } from 'express';
import { handler } from './handler/handler';

const router = Router();

router.post('/timestamp', handler);

export default router;
