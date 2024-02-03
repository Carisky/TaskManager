import axios from "axios";
import config from "./config";

/**
 * Сервис для взаимодействия с сервером для операций с задачами.
 * @class
 */
class TasksService {
  /**
   * Добавление новой задачи на сервер.
   * @async
   * @static
   * @function
   * @param {Object} values - Данные для новой задачи.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
  static async addTask(values) {
    try {
      const response = await axios.post(`${config.host}/tasks`, values);

      if (response.status === 201) {
        return { success: true, message: "Task Added", data: response.data };
      } else {
        return {
          success: false,
          message: "An error occurred while adding the task.",
        };
      }
    } catch (error) {
      console.error("Error adding task:", error.message);
      return {
        success: false,
        message: "An error occurred while adding the task.",
      };
    }
  }

  /**
   * Получение списка задач с сервера.
   * @async
   * @static
   * @function
   * @returns {Promise<Object[]>} - Промис, разрешающийся массивом объектов задач.
   */
  static async getTasks() {
    try {
      const response = await axios.get(`${config.host}/tasks`);

      if (response.status === 201) {
        return response.data;
      } else {
        return {
          success: false,
          message: "An error occurred while getting tasks.",
        };
      }
    } catch (error) {
      console.error("Error getting task:", error.message);
      return {
        success: false,
        message: "An error occurred while getting task.",
      };
    }
  }

  /**
   * Обновление задачи на сервере.
   * @async
   * @static
   * @function
   * @param {number} id - Идентификатор задачи для обновления.
   * @param {Object} formattedValues - Отформатированные данные для обновления задачи.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
  static async editTask(id, formattedValues) {
    try {
      const response = await axios.put(`${config.host}/tasks/${id}`, formattedValues);

      if (response.status === 200) {
        return { success: true, message: "Task updated successfully.", data: response.data };
      } else {
        return {
          success: false,
          message: "An error occurred while updating the task.",
        };
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      return {
        success: false,
        message: "An error occurred while updating the task.",
      };
    }
  }

  /**
   * Удаление задачи с сервера.
   * @async
   * @static
   * @function
   * @param {number} id - Идентификатор задачи для удаления.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
  static async deleteTask(id) {
    try {
      const response = await axios.delete(`${config.host}/tasks/${id}`);

      if (response.status === 200) {
        return { success: true, message: "Task deleted successfully." };
      } else {
        return {
          success: false,
          message: "An error occurred while deleting the task.",
        };
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
      return {
        success: false,
        message: "An error occurred while deleting the task.",
      };
    }
  }

    /**
   * Изменение статуса задачи на сервере.
   * @async
   * @static
   * @function
   * @param {number} id - Идентификатор задачи для Изменения.
   * @returns {Promise<Object>} - Промис, разрешающийся объектом с результатом операции.
   */
    static async changeTaskStatus(id) {
      try {
        const response = await axios.put(`${config.host}/tasks/status/${id}`);
  
        if (response.status === 200) {
          return { success: true, message: "Task status changed.", data:response.data };
        } else {
          return {
            success: false,
            message: "An error occurred while changing status in task.",
          };
        }
      } catch (error) {
        console.error("Error changing status in task:", error.message);
        return {
          success: false,
          message: "An error occurred while changing status in task.",
        };
      }
    }
}

export default TasksService;
