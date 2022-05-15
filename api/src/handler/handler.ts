import { RequestHandler, Request, Response } from 'express';
import Controller from '../controllers/controller';
import { Frequency, Month } from '../types';

export const timestampsHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new Controller();

  const body = req.body;
  const response = await controller.postTimestampRoute(body);
  res.send(response);
};

export const frequencyHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new Controller();

  const { params } = req;

  const response = await controller.getFrequencyRoute(params.frequency as Frequency, params.value as Month | number)
  res.send(response);
};
