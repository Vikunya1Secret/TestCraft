import Question from '../models/question.model.js';
import Test from '../models/test.model.js';

// Получение всех вопросов для теста
export const getQuestionsByTestId = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const questions = await Question.find({ test: req.params.testId }).sort({ orderIndex: 1 });
    res.json(questions);
  } catch (error) {
    console.error('Get questions by test ID error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Создание нового вопроса
export const createQuestion = async (req, res) => {
  try {
    const { questionText, questionType, options, correctAnswer, points, explanation } = req.body;
    const testId = req.params.testId;

    // Проверка существования теста
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: req.body });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Определение порядкового номера для нового вопроса
    const questionCount = await Question.countDocuments({ test: testId });

    // Создание нового вопроса
    const question = await Question.create({
      test: testId,
      questionText,
      questionType,
      options: options || [],
      correctAnswer,
      points: points || 1,
      orderIndex: questionCount,
      explanation
    });

    res.status(201).json(question);
  } catch (error) {
    console.error('Create question error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Создание много нового вопросов
export const createMultipleQuestions = async (req, res) => {
  try {
    const questionsData = req.body; // Ожидаем массив объектов с вопросами
    const testId = req.params.testId;

    // Проверка существования теста
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Получаем текущее количество вопросов, чтобы задать правильный orderIndex
    const existingCount = await Question.countDocuments({ test: testId });

    // Подготовка массива вопросов с указанием ID теста и порядкового номера
    const preparedQuestions = questionsData.map((q, index) => ({
      test: testId,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options || [],
      correctAnswer: q.correctAnswer,
      points: q.points || 1,
      orderIndex: existingCount + index, // Учитываем уже существующие вопросы
      explanation: q.explanation
    }));

    // Массовая вставка вопросов в базу данных
    const insertedQuestions = await Question.insertMany(preparedQuestions);

    // Отправка ответа с добавленными вопросами
    res.status(201).json(insertedQuestions);
  } catch (error) {
    console.error('Ошибка при массовом создании вопросов:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};



// Обновление вопроса
export const updateQuestion = async (req, res) => {
  try {
    const { questionText, questionType, options, correctAnswer, points, explanation } = req.body;

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Вопрос не найден' });
    }

    // Проверка, принадлежит ли вопрос пользователю через тест
    const test = await Test.findById(question.test);

    if (!test || test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Обновление полей вопроса
    question.questionText = questionText || question.questionText;
    question.questionType = questionType || question.questionType;
    question.options = options || question.options;
    question.correctAnswer = correctAnswer !== undefined ? correctAnswer : question.correctAnswer;
    question.points = points || question.points;
    question.explanation = explanation !== undefined ? explanation : question.explanation;

    const updatedQuestion = await question.save();

    res.json(updatedQuestion);
  } catch (error) {
    console.error('Update question error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление вопроса
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Вопрос не найден' });
    }

    // Проверка, принадлежит ли вопрос пользователю через тест
    const test = await Test.findById(question.test);

    if (!test || test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Удаление вопроса
    await question.deleteOne();

    // Обновление orderIndex для остальных вопросов
    await Question.updateMany(
      { test: question.test, orderIndex: { $gt: question.orderIndex } },
      { $inc: { orderIndex: -1 } }
    );

    res.json({ message: 'Вопрос удален' });
  } catch (error) {
    console.error('Delete question error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Изменение порядка вопросов
export const reorderQuestions = async (req, res) => {
  try {
    const { testId, questionOrders } = req.body;

    // Проверка существования теста
    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Обновление порядка вопросов
    for (const item of questionOrders) {
      await Question.findByIdAndUpdate(item.id, { orderIndex: item.order });
    }

    // Получение обновленных вопросов
    const questions = await Question.find({ test: testId }).sort({ orderIndex: 1 });

    res.json(questions);
  } catch (error) {
    console.error('Reorder questions error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение вопросов для прохождения теста
export const getQuestionsForAttempt = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);

    if (!test || !test.isPublished) {
      return res.status(404).json({ message: 'Тест не найден или не опубликован' });
    }

    // Получение вопросов без правильных ответов
    let questions = await Question.find({ test: req.params.testId })
      .select('-correctAnswer')
      .sort({ orderIndex: 1 });

    // Перемешивание вопросов, если включен случайный порядок
    if (test.randomOrder) {
      questions = questions.sort(() => Math.random() - 0.5);
    }

    // Трансформация данных для клиента
    const questionsForAttempt = questions.map(q => ({
      _id: q._id,
      questionText: q.questionText,
      questionType: q.questionType,
      options: q.options.map(opt => ({
        text: opt.text,
        _id: opt._id,
        ...(q.questionType === 'matching' && { matchingPair: opt.matchingPair })
      })),
      points: q.points
    }));

    res.json(questionsForAttempt);
  } catch (error) {
    console.error('Get questions for attempt error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};