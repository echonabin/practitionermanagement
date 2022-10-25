import { Router } from 'express';
import { upload } from '../configs/multer-config';
import { API_ENDPOINTS } from '@practitionermanagement/constants';
// Controllers
import {
  loginUser,
  registerUser,
  refreshToken,
} from '../controllers/auth-controllers';

const router = Router();
const { auth } = API_ENDPOINTS;

// @Method: POST
// @Path: /api/auth/login
router.post(auth.login, loginUser);

// @Method: POST
// @Path: /api/auth/register
router.post(auth.register, upload.single('profile'), registerUser);

// @Method: GET
// @Path: /api/auth/refresh?token=<token>
router.get(auth.refresh, refreshToken);

export { router as authRouter };
