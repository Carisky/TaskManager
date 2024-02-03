import Task from "../Models/Task.mjs"; // Adjust the path based on your project structure

/**
 * Добавляет новую задачу в базу данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const addTask = async (req, res) => {
  try {
    const { title, due_date, priority, description, tags, project_id } = req.body;

    // Валидация данных запроса по необходимости

    const newTask = await Task.addToTable({
      title,
      due_date,
      priority,
      description,
      tags,
      project_id,
      // Добавьте другие свойства при необходимости
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Обновляет задачу в базе данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const putTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, due_date, priority, description, tags } = req.body;

    // Валидация taskId и данных запроса по необходимости

    const updatedTask = await Task.putTask(taskId, {
      title,
      due_date,
      priority,
      description,
      tags,
      // Добавьте другие свойства при необходимости
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Получает все задачи из базы данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getTasks();
    res.status(201).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Удаляет задачу из базы данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Валидация taskId при необходимости

    const isDeleted = await Task.deleteTask(taskId);

    if (isDeleted) {
      res.status(200).json({ message: 'Task deleted successfully.' });
    } else {
      res.status(404).json({ error: `Task with ID ${taskId} not found.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const changeStatus = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Валидация taskId по необходимости

    const updatedTask = await Task.toggleStatus(taskId);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
