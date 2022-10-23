import { Router } from 'express';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { authorize } from '../middlewares/auth';
import {
  getPractitioner,
  createPractitioner,
  deletePractitioner,
  getPractitioners,
  updatePractitioner,
  hardDeletePractitioner,
} from '../controllers/practitioner-controller';
import { upload } from '../configs/multer-config';

const router = Router();
const { practitioner } = API_ENDPOINTS;

// @Method: GET
// @Path: /api/practitioners
router.get(practitioner.get, authorize(), getPractitioners);

// @Method: GET
// @Path: /api/practitioner/:id
router.get(practitioner.getOne, authorize(), getPractitioner);

// @Method: POST
// @Path: /api/practitioner
router.post(
  practitioner.create,
  authorize(),
  upload.single('profileImage'),
  createPractitioner
);

// @Method: PUT
// @Path: /api/practitioner/:id
router.put(
  practitioner.update,
  authorize(),
  upload.single('profileImage'),
  updatePractitioner
);

// @Method: DELETE
// @Path: /api/practitioner/:id
router.delete(practitioner.delete, authorize(), deletePractitioner);

// @Method: DELETE
// @Path: /api/practitioner/hard-delete/:id
router.delete(practitioner.hardDelete, authorize(), hardDeletePractitioner);

export { router as practitionerRouter };
