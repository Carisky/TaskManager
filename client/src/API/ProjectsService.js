import axios from "axios";
import config from "./config";

/**
 * Сервис для взаимодействия с сервером для операций с проектами.
 * @class
 */
class ProjectsService {
  /**
   * Получение списка проектов с сервера.
   * @async
   * @static
   * @function
   * @returns {Promise<Object[]>} - Промис, разрешающийся массивом объектов проектов.
   */
  static async getProjects() {
    try {
      const response = await axios.get(`${config.host}/projects`);

      if (response.status === 201) {
        return response.data;
      } else {
        return {
          success: false,
          message: "An error occurred while getting projects.",
        };
      }
    } catch (error) {
      console.error("Error getting projects:", error.message);
      return {
        success: false,
        message: "An error occurred while getting projects.",
      };
    }
  }

   /**
   * Добавление нового проекта на сервер.
   * @async
   * @static
   * @function
   * @param {Object} projectData - Данные нового проекта.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
   static async addProject(projectData) {
    try {
      const response = await axios.post(`${config.host}/projects`, projectData);

      if (response.status === 201) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "An error occurred while adding the project.",
        };
      }
    } catch (error) {
      console.error("Error adding project:", error.message);
      return {
        success: false,
        message: "An error occurred while adding the project.",
      };
    }
  }
  /**
   * Редактирование проекта на сервере.
   * @async
   * @static
   * @function
   * @param {number} projectId - Идентификатор редактируемого проекта.
   * @param {Object} projectData - Новые данные проекта.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
  static async editProject(projectId, projectData) {
    try {
      const response = await axios.put(`${config.host}/projects/${projectId}`, projectData);

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: "An error occurred while editing the project.",
        };
      }
    } catch (error) {
      console.error("Error editing project:", error.message);
      return {
        success: false,
        message: "An error occurred while editing the project.",
      };
    }
  }
}

export default ProjectsService;
