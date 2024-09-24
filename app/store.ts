import { create } from "zustand";
import { BoxColor, Position } from "./types/types";

interface ResultStore {
  result: string;
  setResult: (newResult: string) => void;
  clearResult: () => void;
  groups: Position[][];
  setGroups: (newGroups: Position[][]) => void;
  cleanGroups: () => void;
  variableQuantity: number;
  setVariableQuantity: (newQuantity: number) => void;
  boxColors: BoxColor[];
  setBoxColors: (newBoxColors: BoxColor[]) => void;
}

export const useStore = create<ResultStore>((set) => ({
  result: "",
  setResult: (newResult: string) => set({ result: newResult }),
  clearResult: () => set({ result: "" }),
  setGroups: (newGroups: Position[][]) => set({ groups: newGroups }),
  groups: [],
  cleanGroups: () => set({ groups: [] }),
  variableQuantity: 2,
  setVariableQuantity: (newQuantity: number) => {
    set({ variableQuantity: newQuantity });
    set({ result: "" });
    set({ boxColors: [] });
  },
  boxColors: [],
  setBoxColors: (newBoxColors: BoxColor[]) => set({ boxColors: newBoxColors }),
}));

export default useStore;
