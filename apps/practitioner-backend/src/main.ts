import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { startupDb } from './startup/startup-db';
import { API_ENDPOINTS } from './constants/api-endpoints';
import startupRoutes from './startup/startup-routes';

const port = process.env.NX_PORT || 3333;
const app = express();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get(API_ENDPOINTS.base_url, (req, res) => {
  res.send({ message: 'Welcome to practitioner-backend!' });
});

// Database connector function
startupDb();

// Startup Routes
startupRoutes(app);

const server = app.listen(port, () => {
  console.log(`⚡️Server listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
