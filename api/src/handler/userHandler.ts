import { RequestHandler, Request, Response } from 'express';
import UserController from '../controllers/userController';

export const searchHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new UserController();
  const { params } = req;


  const response = await controller.getSearchUser(params.userId);
  res.send(response);
};

export const createHandler: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const controller = new UserController();
  const { body } = req;

  const response = await controller.postCreateUser(body);
  res.send(response);
};