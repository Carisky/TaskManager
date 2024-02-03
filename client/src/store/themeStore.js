import create from "zustand";
import { theme } from "antd";
const useThemeStore = create((set) => ({
    algorithm: theme.defaultAlgorithm,
  setTheme: (newTheme) => set({ algorithm: newTheme }),
}));

export default useThemeStore;
