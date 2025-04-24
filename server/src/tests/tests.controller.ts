import { Request, Response } from 'express';
import { TestService } from './tests.service';
import { CreateTestDto, UpdateTestDto } from './types/test.dto';

export const TestController = {
  createTest: async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const dto: CreateTestDto = req.body;
    const test = await TestService.createTest(req.user.id, dto);
    res.status(201).json(test);
  },

  getTests: async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const tests = await TestService.getTests(req.user.id);
    res.json(tests);
  },

  getTest: async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const test = await TestService.getTestById(req.user.id, +req.params.id);
    res.json(test);
  },

  updateTest: async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    const dto: UpdateTestDto = req.body;
    const test = await TestService.updateTest(req.user.id, +req.params.id, dto);
    res.json(test);
  },

  deleteTest: async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return
    }

    await TestService.deleteTest(req.user.id, +req.params.id);
    res.status(204).send();
  },
};