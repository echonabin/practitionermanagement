import { Router } from 'express';
import { API_ENDPOINTS } from '../constants/api-endpoints';
// Controllers
import { registerUser } from '../controllers/auth-controllers';

const router = Router();
const { auth } = API_ENDPOINTS;

// @Method: POST
// @Path: /api/auth/login
router.post(auth.login, (req, res) => {
  res.send({ message: 'Welcome to practitioner-backend!' });
});

// @Method: POST
// @Path: /api/auth/register
router.post(auth.register, registerUser);

export { router as authRouter };
