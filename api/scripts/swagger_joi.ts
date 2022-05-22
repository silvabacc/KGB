import j2s from 'joi-to-swagger';
import { timestampBodySchema } from '../src/validations/routeValidations';

const { swagger } = j2s(timestampBodySchema);

console.log(JSON.stringify(swagger, undefined, 2));