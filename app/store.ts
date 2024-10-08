import { create } from "zustand";
import { BoxColor, VectorResultItem } from "./types/types";

interface ResultStore {
  result: string;
  setResult: (newResult: string) => void;
  vectorResult: VectorResultItem[];
  setVectorResult: (newVectorResult: VectorResultItem[]) => void;
  clearResult: () => void;
  values: string[];
  setAllValues: (newValue: string) => void;
  setValues: (newValues: string[]) => void;
  variableQuantity: number;
  setVariableQuantity: (newQuantity: number) => void;
  boxColors: BoxColor[];
  setBoxColors: (newBoxColors: BoxColor[]) => void;
  reset: () => void;
  resultType: "SOP" | "POS";
  setResultType: (newResultType: "SOP" | "POS") => void;
  circuitVector: string[];
  setCircuitVector: (newCircuitVector: string[]) => void;
  view: "table" | "map";
  setView: (newView: "table" | "map") => void;
  variables: string[];
}

const VARIABLE_QUANTITY = 4;

export const useStore = create<ResultStore>((set) => ({
  variableQuantity: VARIABLE_QUANTITY,
  values: Array.from({ length: 2 ** VARIABLE_QUANTITY }, () => "0"),
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
    set({
      variables: Array.from({ length: newQuantity }, (_, i) =>
        String.fromCharCode(65 + i)
      ),
    });
    set({ variableQuantity: newQuantity });
  },
  boxColors: [],
  setBoxColors: (newBoxColors: BoxColor[]) => set({ boxColors: newBoxColors }),
  reset: () => {
    set({ result: "" });
    set({ boxColors: [] });
  },
  resultType: "SOP",
  setResultType: (newResultType: "SOP" | "POS") =>
    set({ resultType: newResultType }),
  vectorResult: [],
  setVectorResult: (newVectorResult: VectorResultItem[]) =>
    set({ vectorResult: newVectorResult }),
  circuitVector: [],
  setCircuitVector: (newCircuitResult: string[]) => {
    return set({
      circuitVector: newCircuitResult.map((item) => {
        if (item.endsWith(".")) {
          return item.slice(0, item.length - 1);
        }

        if (item.startsWith("+")) {
          return item.slice(0, item.length - 1);
        }

        return item;
      }),
    });
  },
  view: "map",
  setView: (newView: "table" | "map") => set({ view: newView }),
  variables: ["A", "B"],
}));

export default useStore;
