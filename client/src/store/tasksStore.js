import create from "zustand";

/**
 * Хранилище состояния для управления данными о задачах.
 * @function
 * @returns {Object} - Объект состояния и метода управления состоянием.
 */
const useTasksStore = create((set) => ({
  /**
   * Состояние: массив задач.
   * @type {Object[]}
   */
  tasks: [],

  /**
   * Метод для обновления массива задач.
   * @param {Object[]} newTasks - Новый массив задач.
   */
  setTasks: (newTasks) => set({ tasks: newTasks }),
}));

export default useTasksStore;
