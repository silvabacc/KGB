import { RequestHandler, Request, Response } from 'express';
import Controller from '../controllers/controller';

export const handler: RequestHandler = async (req: Request, res: Response) => {
  const controller = new Controller();

  const body = req.body;
  const response = await controller.postTimestampRoute(body);
  res.send(response);
};
