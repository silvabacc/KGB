import axios, { AxiosError } from 'axios';
import { getConfig } from '../config/getConfig';
import { ResponseMessage } from './responseMessages';
import { TimestampBody } from './types';

export const httpRequest = async (method: string, url: string, body?: any) => {
  try {
    const response = await axios({ method, url, data: body });
    return response.data;
  } catch (err: AxiosError | any) {
    console.log(err);
    return ResponseMessage.ERROR;
  }
};
