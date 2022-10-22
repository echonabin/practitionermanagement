import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { errorHandler } from './middlewares/error-handler';
import { startupDb } from './startup/startup-db';

const port = process.env.NX_PORT || 3333;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to practitioner-backend!' });
});

app.all('*', async (req, res) => {
  res.status(404).json({
    errors: [
      {
        message: 'Route Not Found',
      },
    ],
  });
});

app.use(errorHandler);

// Database connector function
startupDb();

const server = app.listen(port, () => {
  console.log(`⚡️Server listening at http://localhost:${port}/api`);
});

console.log(process.env.NX_MONGODB_URI);

server.on('error', console.error);
