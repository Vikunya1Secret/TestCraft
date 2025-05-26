import Test from '../models/test.model.js';
import Question from '../models/question.model.js';

// import Test from '../models/Test.js';

export const getTests = async (req, res) => {
  try {
    const tests = await Test.aggregate([
      { $match: { creator: req.user._id } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: 'questions',         // collection name (auto-pluralized)
          localField: '_id',         // Test._id
          foreignField: 'test',      // Question.test
          as: 'questions'
        }
      },
      {
        $addFields: {
          questionsCount: { $size: '$questions' }
        }
      },
      {
        $project: {
          questions: 0               // exclude the full questions array
        }
      }
    ]);

    res.json(tests);
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};



// Получение теста по ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
      .populate({
        path: 'questions',
        select: '-correctAnswer' // Exclude this field
      });

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    res.json(test);
  } catch (error) {
    console.error('Get test by ID error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};


// Создание нового теста
export const createTest = async (req, res) => {
  try {
    const { title, description, timeLimit, passingScore } = req.body;

    const test = await Test.create({
      title,
      description,
      creator: req.user._id,
      timeLimit: timeLimit || 0,
      passingScore: passingScore || 60
    });

    res.status(201).json(test);
  } catch (error) {
    console.error('Create test error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновление теста
export const updateTest = async (req, res) => {
  try {
    const { title, description, timeLimit, passingScore, isPublished, randomOrder } = req.body;

    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Обновление полей теста
    test.title = title || test.title;
    test.description = description || test.description;
    test.timeLimit = timeLimit !== undefined ? timeLimit : test.timeLimit;
    test.passingScore = passingScore || test.passingScore;
    test.isPublished = isPublished !== undefined ? isPublished : test.isPublished;
    test.randomOrder = randomOrder !== undefined ? randomOrder : test.randomOrder;
    test.updatedAt = Date.now();

    const updatedTest = await test.save();

    res.json(updatedTest);
  } catch (error) {
    console.error('Update test error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление теста
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Удаление всех вопросов, связанных с тестом
    await Question.deleteMany({ test: test._id });

    // Удаление теста
    await test.deleteOne();

    res.json({ message: 'Тест удален' });
  } catch (error) {
    console.error('Delete test error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Публикация теста
export const publishTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, является ли пользователь создателем теста
    if (test.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    // Проверка, есть ли вопросы в тесте
    const questionsCount = await Question.countDocuments({ test: test._id });

    if (questionsCount === 0) {
      return res.status(400).json({ message: 'Нельзя опубликовать тест без вопросов' });
    }

    // Публикация теста
    test.isPublished = true;
    test.updatedAt = Date.now();

    const updatedTest = await test.save();

    res.json(updatedTest);
  } catch (error) {
    console.error('Publish test error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Получение публичного теста по ID (без авторизации)
export const getPublicTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: 'Тест не найден' });
    }

    // Проверка, опубликован ли тест
    if (!test.isPublished) {
      return res.status(404).json({ message: 'Тест не найден или не опубликован' });
    }

    // Возвращаем только основную информацию о тесте без вопросов
    const publicTest = {
      _id: test._id,
      title: test.title,
      description: test.description,
      timeLimit: test.timeLimit,
      randomOrder: test.randomOrder
    };

    res.json(publicTest);
  } catch (error) {
    console.error('Get public test by ID error:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};