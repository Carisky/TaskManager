import { Model } from "objection";

/**
 * Модель для представления задач в базе данных.
 * @extends Model
 */
class Task extends Model {
  /**
   * Возвращает имя таблицы для хранения задач в базе данных.
   * @static
   * @returns {string} - Имя таблицы.
   */
  static get tableName() {
    return "tasks";
  }

  /**
   * Возвращает JSON-схему для валидации данных задачи.
   * @static
   * @returns {Object} - JSON-схема.
   */
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "due_date", "priority"],
      properties: {
        id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 255 },
        due_date: { type: "string", format: "date-time" },
        description: { type: "string" },
        tags: { type: "string" },
        priority: { type: "integer", minimum: 1 },
        project_id: { type: "integer" },
        // Добавьте другие свойства по мере необходимости
      },
    };
  }

  /**
   * Добавляет новую задачу в базу данных.
   * @static
   * @async
   * @param {Object} taskData - Данные для новой задачи.
   * @returns {Promise<Task>} - Промис, который разрешается созданной задачей.
   */
  static async addToTable(taskData) {
    try {
      const newTask = await this.query().insert(taskData);
      return newTask;
    } catch (error) {
      throw new Error(`Error adding task to the database: ${error.message}`);
    }
  }

  /**
   * Обновляет задачу в базе данных.
   * @static
   * @async
   * @param {number} taskId - Идентификатор задачи.
   * @param {Object} updatedTaskData - Обновленные данные задачи.
   * @returns {Promise<Task>} - Промис, который разрешается обновленной задачей.
   */
  static async putTask(taskId, updatedTaskData) {
    try {
      // Используйте метод where для фильтрации задач по ID, а затем обновите
      const updatedTaskCount = await this.query()
        .update(updatedTaskData)
        .where({ id: taskId });

      if (updatedTaskCount === 1) {
        // Задача успешно обновлена
        const updatedTask = await this.query().findById(taskId);
        return updatedTask;
      } else {
        // Задача с указанным ID не найдена
        throw new Error(`Task with ID ${taskId} not found`);
      }
    } catch (error) {
      throw new Error(`Error updating task in the database: ${error.message}`);
    }
  }

/**
 * Изменяет статус задачи в базе данных на противоположный.
 * @static
 * @async
 * @param {number} taskId - Идентификатор задачи.
 * @returns {Promise<Task>} - Промис, который разрешается обновленной задачей.
 */
static async toggleStatus(taskId) {
  try {
    // Получите текущую задачу
    const currentTask = await this.query().findById(taskId);

    // Поменяйте статус на противоположный
    currentTask.is_done = !currentTask.is_done;

    // Используйте метод where для фильтрации задач по ID, а затем обновите статус
    const updatedTaskCount = await this.query().update(currentTask).where({ id: taskId });

    if (updatedTaskCount === 1) {
      // Задача успешно обновлена
      const updatedTask = await this.query().findById(taskId);
      return updatedTask;
    } else {
      // Задача с указанным ID не найдена
      throw new Error(`Task with ID ${taskId} not found`);
    }
  } catch (error) {
    throw new Error(`Error changing task status in the database: ${error.message}`);
  }
}



  /**
   * Возвращает все задачи из базы данных.
   * @static
   * @async
   * @returns {Promise<Array<Task>>} - Промис, который разрешается массивом задач.
   */
  static async getTasks() {
    try {
      const tasks = await this.query().select("*");
      return tasks;
    } catch (error) {
      throw new Error(
        `Error getting tasks from the database: ${error.message}`
      );
    }
  }

  /**
   * Удаляет задачу из базы данных.
   * @static
   * @async
   * @param {number} taskId - Идентификатор задачи.
   * @returns {Promise<boolean>} - Промис, который разрешается true в случае успешного удаления.
   */
  static async deleteTask(taskId) {
    try {
      // Используйте метод where для фильтрации задач по ID, а затем удалите
      const deletedTaskCount = await this.query().deleteById(taskId);

      if (deletedTaskCount === 1) {
        // Задача успешно удалена
        return true;
      } else {
        // Задача с указанным ID не найдена
        throw new Error(`Task with ID ${taskId} not found`);
      }
    } catch (error) {
      throw new Error(
        `Error deleting task from the database: ${error.message}`
      );
    }
  }
}

export default Task;
