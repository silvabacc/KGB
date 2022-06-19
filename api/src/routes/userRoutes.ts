import { Router } from 'express';
import {} from '../handler/timestampHandler';
import { searchHandler, createHandler } from '../handler/userHandler';
import {
  validateCreateUser,
  validateUserId
} from '../validations/routeValidations';

const userRoutes = Router();

userRoutes.get('/search/:userId', validateUserId, searchHandler);
userRoutes.post('/create', validateCreateUser, createHandler);

export default userRoutes;
