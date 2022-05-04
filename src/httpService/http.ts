import axios from 'axios';
import { TimestampBody } from '../../api/src/types';
import { getConfig } from '../config/getConfig';
import { ResponseMessage } from './responseMessages';

const { KGB_API_URL } = getConfig();

console.log(KGB_API_URL);

export const timestampRequest = async (body: TimestampBody) => {
  try {
    const response = await axios.post(`${KGB_API_URL}/timestamp`, { body });
    return ResponseMessage.SUCCESS;
  } catch (error) {
    console.log(error);
    throw Error(ResponseMessage.ERROR);
  }
};
