import Project from "../Models/Project.mjs";

/**
 * Добавляет новый проект в базу данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const addProject = async (req, res) => {
  try {
    const projectData = req.body; // Предполагается, что данные проекта передаются в теле запроса
    const newProject = await Project.addProject(projectData);
    
    // Отвечаем новосозданным проектом
    res.status(201).json(newProject);
  } catch (error) {
    // Обрабатываем ошибки
    console.error("Error in addProjectController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


/**
 * Получает все проекты из базы данных.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.getProjects();
    res.status(201).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/**
 * Обновляет проект в базе данных по его идентификатору.
 * @param {Object} req - Объект запроса Express.
 * @param {Object} res - Объект ответа Express.
 * @returns {Promise<void>} - Промис, который разрешается после обработки запроса.
 */
export const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id; // Предполагается, что идентификатор проекта передается в URL
    const projectData = req.body; // Предполагается, что данные проекта для обновления передаются в теле запроса
    const updatedProject = await Project.updateProject(projectId, projectData);

    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    console.error(`Error in updateProjectController: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};