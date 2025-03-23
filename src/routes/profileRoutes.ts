import { Router } from 'express';
import {
  registerUser,
  getUserProfile,
  editUserProfile,
  deleteProfile,
  changePassword,
} from '../controllers/profileController';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, editUserProfile);
router.delete('/account', verifyToken, deleteProfile);
router.post('/password-change', verifyToken, changePassword);

export default router;
