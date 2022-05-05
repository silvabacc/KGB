import axios, { AxiosError } from 'axios';
import { TimestampBody } from '../../api/src/types';
import { getConfig } from '../config/getConfig';
import { ResponseMessage } from './responseMessages';

export const httpRequest = async (url: string, body: TimestampBody) => {
  try {
    const response = await axios.post(url, body);
    return ResponseMessage.SUCCESS;
  } catch (err: AxiosError | any) {
    console.log(err.response.data);
    return ResponseMessage.ERROR;
  }
};
