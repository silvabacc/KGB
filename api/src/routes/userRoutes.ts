import { Router } from 'express';
import {
  frequencyHandler,
  timestampsHandler
} from '../handler/timestampHandler';
import { searchHandler, createHandler } from '../handler/userHandler';
import {
    validateCreateUser,
  validateFrequencyRoute,
  validateTimestampRoute,
  validateUserId
} from '../validations/routeValidations';

const userRoutes = Router();

userRoutes.get('/search/:userId', validateUserId, searchHandler);
userRoutes.post('/create', validateCreateUser, createHandler);

export default userRoutes;
