import axios, { AxiosError } from 'axios';
import { getConfig } from '../config/getConfig';
import { ResponseMessage } from './responseMessages';
import { TimestampBody } from './types';

export const httpRequest = async (url: string, body: TimestampBody) => {
  try {
    const response = await axios.post(url, body);
    return ResponseMessage.SUCCESS;
  } catch (err: AxiosError | any) {
    console.log(err);
    return ResponseMessage.ERROR;
  }
};
