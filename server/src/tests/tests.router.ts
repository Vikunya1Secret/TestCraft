import express from 'express';
import { TestController } from './tests.controller';
import { validate } from '../middleware/validation.middleware';
import { createTestSchema, updateTestSchema } from './schemas/test.schema';
import { authMiddleware } from '../auth/middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(createTestSchema), TestController.createTest);
router.get('/', TestController.getTests);
router.get('/:id', TestController.getTest);
router.put('/:id', validate(updateTestSchema), TestController.updateTest);
router.delete('/:id', TestController.deleteTest);

export default router;