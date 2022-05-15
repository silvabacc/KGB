import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { Frequency, Month, Status } from '../types';

export const timestampBodySchema = Joi.object({
  username: Joi.string().required(),
  timestamp: Joi.number().required(),
  status: Joi.string()
    .valid(...Object.values(Status))
    .required()
});

export const frequencySchema = Joi.object({
  frequency: Joi.string().valid(...Object.values(Frequency)),
  value: Joi.string().valid(...Object.values(Month))
})

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

export const validateFrequencyRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { params } = req;
  const validationResult = frequencySchema.validate(params);
  
  if(validationResult.error){
    res.status(400).send(`Validation Error: ${validationResult.error.message}`);
  }
  next();
};
