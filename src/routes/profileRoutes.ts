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
  '/editProfile/:id',
  verifyToken,
  validateRequest(updateUserSchema),
  editUserProfile
);
router.delete('/editProfile/:id', verifyToken, deleteProfile);
router.post(
  '/password-change/:id',
  verifyToken,
  validateRequest(changePasswordSchema),
  changePassword
);

export default router;
