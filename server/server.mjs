import express from 'express';
import taskRouter from './routes/taskRouter.mjs';
import projectRouter from './routes/projectRouter.mjs';
import { Model } from 'objection';
import knexConfig from './knexfile.mjs';
import Knex from "knex";
import cors from "cors";

// Инициализация Knex и Objection.js с конфигурацией
const knex = Knex(knexConfig.development);
Model.knex(knex);

/**
 * Экземпляр приложения Express.
 * @type {express.Application}
 */
const app = express();

/**
 * Конфигурация сервера.
 * @type {Object}
 * @property {number} port - Порт сервера.
 */
const serverConfig = {
  port: process.env.SERVER_PORT || 3001, // Используйте переменную окружения для порта
};

// Настройка CORS
app.use(cors());

// Middleware для парсинга JSON
app.use(express.json());

// Подключение роутеров
app.use(taskRouter);
app.use(projectRouter);

/**
 * Обработчик главного маршрута.
 * @function
 * @async
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
app.get('/', async (req, res) => {
  try {
    res.json("Server online");
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * Запуск сервера.
 * @function
 * @param {number} serverConfig.port - Порт, на котором запускается сервер.
 * @param {Function} callback - Функция обратного вызова при успешном запуске сервера.
 * @returns {Object} - Объект сервера Express.
 */
const server = app.listen(serverConfig.port, () => {
  console.log(`Server is running on http://localhost:${serverConfig.port}`);
}).on('error', (err) => {
  console.error('Server start error:', err.message);
});

export default server;
