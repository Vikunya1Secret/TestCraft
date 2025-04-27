import { TestNotFoundError } from '@/errors/questions';
import { PrismaClient } from '../generated/prisma/client';
import { CreateQuestionDto, MatchingQuestionDto, MultipleChoiceQuestionDto, QuestionResponse, QuestionType, SequenceQuestionDto, SingleChoiceQuestionDto, TextInputQuestionDto } from './types/question.dto';

const prisma = new PrismaClient();

function isType<T extends CreateQuestionDto>(
  dto: CreateQuestionDto,
  type: QuestionType
): dto is T {
  return dto.questionType === type;
}

export const QuestionService = {
  async createQuestion(testId: number, dto: CreateQuestionDto): Promise<QuestionResponse> {
    console.log('Service received testId:', testId);
    
    const test = await prisma.test.findUnique({
      where: { id: testId },
      select: { id: true }
    });

    if (!test) {
      throw new Error(`Test with ID ${testId} not found`);
    }
    
    console.log(`Checking test existence for ID: ${testId}`);
    
    const testExists = await prisma.test.count({ 
      where: { id: testId } 
    });
    
    console.log(`Test exists result: ${testExists}`);

    if (!testExists) {
      throw new TestNotFoundError();
    }
    
    let options = {};
    let correctAnswer: any;

    // Обработка для каждого типа вопроса
    if (isType<SingleChoiceQuestionDto>(dto, 'SINGLE_CHOICE')) {
      options = { options: dto.options };
      correctAnswer = dto.correctAnswer;
    } 
    else if (isType<MultipleChoiceQuestionDto>(dto, 'MULTIPLE_CHOICE')) {
      options = { options: dto.options };
      correctAnswer = dto.correctAnswer;
    }
    else if (isType<TextInputQuestionDto>(dto, 'TEXT_INPUT')) {
      options = { correctAnswers: dto.correctAnswers };
      correctAnswer = dto.correctAnswers;
    }
    else if (isType<MatchingQuestionDto>(dto, 'MATCHING')) {
      options = { pairs: dto.pairs };
      correctAnswer = dto.correctAnswer;
    }
    else if (isType<SequenceQuestionDto>(dto, 'SEQUENCE')) {
      options = { items: dto.items };
      correctAnswer = dto.correctAnswer;
    
      // Проверка валидности индексов
      const maxIndex = dto.items.length - 1;
      if (dto.correctAnswer.some(idx => idx > maxIndex)) {
        throw new Error('Invalid sequence indexes');
      }
    }

    return prisma.question.create({
      data: {
        test: { connect: { id: testId } },
        questionText: dto.questionText,
        questionType: dto.questionType,
        points: dto.points,
        orderNumber: dto.orderNumber,
        options,
        correctAnswer
      },
      select: {
        id: true,
        questionText: true,
        questionType: true,
        points: true,
        orderNumber: true,
        options: true,
        correctAnswer: true
      }
    });
  }
};