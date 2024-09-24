import { create } from "zustand";

interface ResultStore {
  result: string;
  setResult: (newResult: string) => void;
  clearResult: () => void;
}

export const useStore = create<ResultStore>((set) => ({
  result: "",
  setResult: (newResult: string) => set({ result: newResult }),
  clearResult: () => set({ result: "" }),
}));

export default useStore;
