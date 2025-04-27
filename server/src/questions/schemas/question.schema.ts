import Joi from 'joi';
import { QuestionType } from '../types/question.dto';

const baseSchema = {
  questionText: Joi.string().min(5).required(),
  questionType: Joi.string().valid(...[
    'SINGLE_CHOICE',
    'MULTIPLE_CHOICE',
    'TEXT_INPUT',
    'MATCHING',
    'SEQUENCE'
  ] as QuestionType[]).required(),
  points: Joi.number().min(1).required(),
  orderNumber: Joi.number().min(0).required(),
};

export const createQuestionSchema = Joi.alternatives().try(
  // SINGLE_CHOICE
  Joi.object({
    ...baseSchema,
    questionType: Joi.string().valid('SINGLE_CHOICE').required(),
    options: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.number().min(0).required(),
  }),
  
  // MULTIPLE_CHOICE
  Joi.object({
    ...baseSchema,
    questionType: Joi.string().valid('MULTIPLE_CHOICE').required(),
    options: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.array().items(Joi.number()).min(1).required(),
  }),
  
  // TEXT_INPUT
  Joi.object({
    ...baseSchema,
    questionType: Joi.string().valid('TEXT_INPUT').required(),
    correctAnswers: Joi.array().items(Joi.string()).min(1).required(),
  }),
  
  // MATCHING
  Joi.object({
    ...baseSchema,
    questionType: Joi.string().valid('MATCHING').required(),
    pairs: Joi.array().items(
      Joi.object({
        left: Joi.string().required(),
        right: Joi.string().required()
      })
    ).min(2).required(),
    correctAnswer: Joi.array().items(
      Joi.array().items(Joi.number().integer().min(0)).length(2)
    ).min(1).required()
  }),
  
  // SEQUENCE
  Joi.object({
    ...baseSchema,
    questionType: Joi.string().valid('SEQUENCE').required(),
    items: Joi.array().items(Joi.string()).min(2).required(),
    correctAnswer: Joi.array()
      .items(Joi.number().integer().min(0))
      .min(1)
      .required()
      .custom((value, helpers) => {
        const maxIndex = helpers.state.ancestors[0].items.length - 1;
        if (value.some((num: number) => num > maxIndex)) {
          return helpers.error('array.invalidSequence');
        }
        return value;
      }, 'Sequence validation')
  })
  .messages({
    'array.invalidSequence': 'Sequence indexes are out of bounds'
  })
);