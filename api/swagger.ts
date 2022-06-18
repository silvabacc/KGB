const swagger = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'REST API',
    description: ''
  },
  host: 'kgb-api.nasdiscordbots.repl.co',
  basePath: '/',
  schemes: ['http'],
  paths: {
    '/timestamp': {
      post: {
        description: 'Adds a timestamp',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: '',
            required: false,
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string'
                },
                timestamp: {
                  type: 'number',
                  format: 'float'
                },
                status: {
                  type: 'string',
                  enum: ['CONNECTED', 'DISCONNECTED']
                },
                userId: {
                  type: 'string',
                }
              },
              required: ['username', 'timestamp', 'status'],
              additionalProperties: false
            }
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            response: {
              'message:': 'POSTED'
            }
          },
          '400': {
            description: 'Bad Request'
          }
        }
      }
    },
    '/timestamp/{frequency}/{value}': {
      get: {
        description:
          'Returns monthly or weekly data - This uses the Firebase service. Currently migrating to Supabase',
        parameters: [
          {
            name: 'frequency',
            in: 'path',
            required: true,
            type: 'monthly or frequency'
          },
          {
            name: 'value',
            in: 'path',
            required: true,
            type: 'First 3 letters of a month, with capital e.g. Jan'
          }
        ],
        responses: {
          '200': {
            description: 'OK',
            examples: {
              'application/json': {
                data: [
                  {
                    username: 'JohnSmith123',
                    data: [
                      [1651968000000, 1.7473877777777778],
                      [1653004800000, 4.176603055555556]
                    ],
                    monthly: 5.923990833333334,
                    name: 'JohnSmith123'
                  },
                  {
                    username: 'SmithJohn123',
                    data: [
                      [1653004800000, 2.9382841666666666],
                      [1653177600000, 5.8708175]
                    ],
                    monthly: 30.176431388888886,
                    name: 'SmithJohn123'
                  }
                ]
              }
            }
          },
          '400': {
            description: 'Bad Request'
          }
        }
      }
    },
  }
};

export default swagger;
