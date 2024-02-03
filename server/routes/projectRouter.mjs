import express from 'express';
import { addProject, getProjects, updateProject } from '../controllers/projectController.mjs';

/**
 * Роутер для управления маршрутами, связанными с проектами.
 * @type {express.Router}
 */
const projectRouter = express.Router();

/**
 * Маршрут для создания нового проекта.
 * @name POST /projects
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
projectRouter.post('/projects', addProject);

/**
 * Маршрут для получения всех проектов.
 * @name GET /projects
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
projectRouter.get('/projects', getProjects);

/**
 * Маршрут для получения всех проектов.
 * @name PUT /projects
 * @function
 * @memberof module:taskRouter
 * @param {string} path - Путь маршрута.
 * @param {Function} middleware - Контроллер для обработки запроса.
 */
projectRouter.put('/projects/:id', updateProject);

export default projectRouter;
