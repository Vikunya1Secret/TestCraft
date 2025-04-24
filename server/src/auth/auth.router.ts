import { Router } from 'express';
import { authController } from './auth.controller';
import { body } from 'express-validator';
import { authMiddleware } from './middleware/auth.middleware';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().trim().withMessage('Name is required')
  ],
  authController.registration
);

router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  authController.login
);

router.get('/users', authMiddleware, authController.getUsers);
router.get('/me', authMiddleware, authController.getCurrentUser);

export default router;