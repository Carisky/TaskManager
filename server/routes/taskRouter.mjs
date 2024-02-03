import express from 'express';
import { addTask, getTasks, deleteTask, putTask, changeStatus } from '../controllers/taskController.mjs';

/**
 * Роутер для управления маршрутами, связанными с задачами.
 * @type {express.Router}
 */
const taskRouter = express.Router();

/**
 * Маршрут для создания новой задачи.
 * @name POST /tasks
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
taskRouter.post('/tasks', addTask);

/**
 * Маршрут для получения всех задач.
 * @name GET /tasks
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
taskRouter.get('/tasks', getTasks);

/**
 * Маршрут для обновления задачи.
 * @name PUT /tasks/:id
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута с параметром :id.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
taskRouter.put('/tasks/:id', putTask);

/**
 * Маршрут для обновления статуса задачи.
 * @name PUT /tasks/status/:id
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута с параметром :id.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
taskRouter.put('/tasks/status/:id', changeStatus);

/**
 * Маршрут для удаления задачи.
 * @name DELETE /tasks/:id
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута с параметром :id.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
taskRouter.delete('/tasks/:id', deleteTask);



export default taskRouter;
