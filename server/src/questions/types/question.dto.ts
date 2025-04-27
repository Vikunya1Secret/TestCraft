export type BaseQuestionDto = {
    questionText: string;
    questionType: QuestionType;
    points: number;
    orderNumber: number;
  };
  
  export type SingleChoiceQuestionDto = BaseQuestionDto & {
    questionType: 'SINGLE_CHOICE';
    options: string[];
    correctAnswer: number;
  };
  
  export type MultipleChoiceQuestionDto = BaseQuestionDto & {
    questionType: 'MULTIPLE_CHOICE';
    options: string[];
    correctAnswer: number[];
  };
  
  export type TextInputQuestionDto = BaseQuestionDto & {
    questionType: 'TEXT_INPUT';
    correctAnswers: string[];
  };
  
  export type MatchingQuestionDto = BaseQuestionDto & {
    questionType: 'MATCHING';
    pairs: Array<{ left: string; right: string }>;
    correctAnswer: Array<[number, number]>; // Пары индексов
  };
  
  export type SequenceQuestionDto = BaseQuestionDto & {
    questionType: 'SEQUENCE';
    items: string[];
    correctAnswer: number[]; // Правильный порядок индексов
  };

  export type QuestionResponse = {
    id: number;
    questionText: string;
    questionType: QuestionType;
    points: number;
    orderNumber: number;
    options?: any;
    correctAnswer?: any;
  };
  
  export type CreateQuestionDto = 
    | SingleChoiceQuestionDto
    | MultipleChoiceQuestionDto
    | TextInputQuestionDto
    | MatchingQuestionDto
    | SequenceQuestionDto;

  export type QuestionType = 
    | 'SINGLE_CHOICE'
    | 'MULTIPLE_CHOICE'
    | 'TEXT_INPUT'
    | 'MATCHING'
    | 'SEQUENCE';