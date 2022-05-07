import { NextFunction, Request, Response } from 'express';
import Joi from 'Joi';
import { Status } from '../types';

export const timestampBodySchema = Joi.object({
  username: Joi.string().required(),
  timestamp: Joi.number().required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required()
});

export const validateTimestampRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult = timestampBodySchema.validate(req.body);
  if (validationResult.error) {
    res.status(400).send(`Validation Error: ${validationResult.error.message}`);
  } else {
    next();
  }
};
