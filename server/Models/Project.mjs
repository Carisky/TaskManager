import { Model } from "objection";

/**
 * Модель для представления проектов в базе данных.
 * @extends Model
 */
class Project extends Model {
  /**
   * Возвращает имя таблицы для хранения проектов в базе данных.
   * @static
   * @returns {string} - Имя таблицы.
   */
  static get tableName() {
    return "projects";
  }

  /**
   * Возвращает JSON-схему для валидации данных проекта.
   * @static
   * @returns {Object} - JSON-схема.
   */
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        description: { type: "string" },
      },
    };
  }

  /**
   * Добавляет новый проект в базу данных.
   * @static
   * @async
   * @param {Object} projectData - Данные для нового проекта.
   * @returns {Promise<Project>} - Промис, который разрешается созданным проектом.
   */
  static async addProject(projectData) {
    try {
      const newProject = await this.query().insert(projectData);
      return newProject;
    } catch (error) {
      console.error("Error adding project:", error);
      throw error;
    }
  }

  /**
   * Возвращает все проекты из базы данных.
   * @static
   * @async
   * @returns {Promise<Array<Project>>} - Промис, который разрешается массивом проектов.
   */
  static async getProjects() {
    try {
      const projects = await this.query().select('*');
      return projects;
    } catch (error) {
      console.error("Error getting projects:", error);
      throw error;
    }
  }

  /**
   * Обновляет проект в базе данных по его идентификатору.
   * @static
   * @async
   * @param {number} projectId - Идентификатор проекта для обновления.
   * @param {Object} projectData - Новые данные проекта.
   * @returns {Promise<Project>} - Промис, который разрешается обновленным проектом.
   */
  static async updateProject(projectId, projectData) {
    try {
      const updatedProject = await this.query().patchAndFetchById(projectId, projectData);
      return updatedProject;
    } catch (error) {
      console.error(`Error updating project with ID ${projectId}:`, error);
      throw error;
    }
  }
}

export default Project;
