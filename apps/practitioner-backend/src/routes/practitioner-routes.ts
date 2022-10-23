import { Router } from 'express';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { authorize } from '../middlewares/auth';

const router = Router();
const { practitioner } = API_ENDPOINTS;

// @Method: GET
// @Path: /api/practitioner
router.get(practitioner.get, authorize(), (req, res) => {
  res.send({ message: 'Welcome to practitioner-backend!' });
});

export { router as practitionerRouter };
