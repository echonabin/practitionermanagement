import * as express from 'express';
import { Express } from 'express';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { errorHandler } from '../middlewares/error-handler';

// Routes
import { authRouter } from '../routes/auth-routes';
import { practitionerRouter } from '../routes/practitioner-routes';

export default (app: Express) => {
  const { base_url } = API_ENDPOINTS;
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Base URL => "/api"
  app.use(base_url, authRouter);
  app.use(base_url, practitionerRouter);

  // Incase of 404 (Not Found)
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
};
