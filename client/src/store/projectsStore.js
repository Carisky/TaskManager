import create from "zustand";

/**
 * Хранилище состояния для управления данными о проектах.
 * @function
 * @returns {Object} - Объект состояния и метода управления состоянием.
 */
const useProjectsStore = create((set) => ({
  /**
   * Состояние: массив проектов.
   * @type {Object[]}
   */
  projects: [],

  /**
   * Метод для обновления массива проектов.
   * @param {Object[]} newProjects - Новый массив проектов.
   */
  setProjects: (newProjects) => set({ projects: newProjects }),
}));

export default useProjectsStore;
