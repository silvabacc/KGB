import { TimestampBody } from '../types';

class Controller {
  postTimestampRoute(body: TimestampBody) {
    console.log(JSON.stringify(body));
    return { message: 'POSTED' };
  }
}

export default Controller;
