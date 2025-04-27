import express from 'express';
import { QuestionController } from './questions.controller';
import { createQuestionSchema } from './schemas/question.schema';
import { authMiddleware } from '../auth/middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authMiddleware,
  validate(createQuestionSchema),
  (req, res, next) => {
    console.log('Params:', req.params); // Добавляем лог
    next();
  },
  QuestionController.createQuestion
);

export default router;