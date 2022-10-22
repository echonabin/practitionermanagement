import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { errorHandler } from './middlewares/error-handler';
import { DatabaseConnectionError } from './errors/database-connection-error';

const port = process.env.NX_PORT || 3333;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to practitioner-backend!' });
});

app.get('/test', (req, res) => {
  throw new DatabaseConnectionError();
});

app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`⚡️Server listening at http://localhost:${port}/api`);
});

console.log(process.env.NX_MONGODB_URI);

server.on('error', console.error);
