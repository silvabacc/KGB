# KGB API
The KGB API consists of two abstractions.
1. Restful API that handles requests with routes
2. Database service that connects to DB and returns data
The KGB API will recieve requests from clients and if needed, will connect to the database and return what is needed

## Restful API
As mentioned before, KGB API is a restful API that uses standard `handlers` and `controllers` for requests. As an example, the main controller the API uses is the `TimestampController` that handles requests for the timestamp route or anything related to timestamps

## Database Service
There is a database abstraction within this Restful API that solely connects to the database and returns the data from there. We use Firebase as our backend service so communicated to this database is done via Firebase queries

# Validations
We use Joi for our validations for requests
