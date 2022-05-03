import { TimestampBody } from '../types';

class Controller {
  postTimestampRoute(body: TimestampBody) {
    return { message: 'POSTED' };
  }
}

export default Controller;
