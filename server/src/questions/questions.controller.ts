import { Request, Response, NextFunction } from 'express';
import { QuestionService } from './questions.service';
import { CreateQuestionDto } from './types/question.dto';
import { validate } from '../middleware/validation.middleware';

export const QuestionController = {
  createQuestion: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Используем params.id вместо testId
      const testId = parseInt(req.params.id, 10);
      
      console.log('Received testId:', testId, 'Type:', typeof testId);
      
      if (isNaN(testId)) {
        res.status(400).json({ 
          message: 'Invalid test ID format',
          received: req.params.id
        });
        return
      }

      const dto = req.body as CreateQuestionDto;
      const question = await QuestionService.createQuestion(testId, dto);
      res.status(201).json(question);
    } catch (error) {
      next(error);
    }
  }
};