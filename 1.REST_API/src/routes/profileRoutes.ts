import { Router } from 'express';
import {
  registerUser,
  getUserProfile,
  editUserProfile,
  deleteProfile,
  changePassword,
} from '../controllers/profileController';
import { verifyToken } from '../middleware/authMiddleware';
import {
  createUserSchema,
  updateUserSchema,
  changePasswordSchema,
} from '../validators/profileValidation';
import { validateRequest } from '../middleware/validateRoutes';

const router = Router();

router.post('/register', validateRequest(createUserSchema), registerUser);
router.get('/profile/:id', verifyToken, getUserProfile);
router.put(
  '/edit-profile/:id',
  verifyToken,
  validateRequest(updateUserSchema),
  editUserProfile
);
router.delete('/edit-profile/:id', verifyToken, deleteProfile);
router.post(
  '/change-password/:id',
  verifyToken,
  validateRequest(changePasswordSchema),
  changePassword
);

export default router;
