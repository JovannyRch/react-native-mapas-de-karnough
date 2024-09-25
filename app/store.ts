import { create } from "zustand";
import { BoxColor, Position } from "./types/types";

interface ResultStore {
  result: string;
  setResult: (newResult: string) => void;
  clearResult: () => void;
  values: string[];
  setAllValues: (newValue: string) => void;
  setValues: (newValues: string[]) => void;
  variableQuantity: number;
  setVariableQuantity: (newQuantity: number) => void;
  boxColors: BoxColor[];
  setBoxColors: (newBoxColors: BoxColor[]) => void;
  reset: () => void;
}

export const useStore = create<ResultStore>((set) => ({
  variableQuantity: 2,
  values: ["0", "0", "0", "0"],
  setValues: (newValues: string[]) => set({ values: newValues }),
  setAllValues: (newValue: string) => {
    set({ values: Array.from({ length: 2 ** 4 }, () => newValue) });
  },
  result: "",
  setResult: (newResult: string) => set({ result: newResult }),
  clearResult: () => set({ result: "" }),

  setVariableQuantity: (newQuantity: number) => {
    set({ result: "" });
    set({ boxColors: [] });
    set({ values: Array.from({ length: 2 ** newQuantity }, () => "0") });
    set({ variableQuantity: newQuantity });
  },
  boxColors: [],
  setBoxColors: (newBoxColors: BoxColor[]) => set({ boxColors: newBoxColors }),
  reset: () => {
    set({ result: "" });
    set({ boxColors: [] });
  },
}));

export default useStore;
