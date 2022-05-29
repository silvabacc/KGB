import { RequestHandler, Request, Response } from 'express';
import TimestampController from '../controllers/timestampController';
import { v1 } from '../routes/routes';
import { Frequency, Month } from '../types';

export const timestampsHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new TimestampController();
  const { body } = req;

  const response = await controller.postTimestampRoute(body);
  res.send(response);
};

export const frequencyHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new TimestampController();
  const { params, baseUrl } = req;
  const isV1 = baseUrl === v1;

  const response = await controller.getFrequencyRoute(
    params.frequency as Frequency,
    params.value as Month | number,
    isV1
  );
  res.send(response);
};
