import React, { useMemo } from "react";
import useStore from "../store";

const useSquares = () => {
  const { values, variableQuantity } = useStore();

  const getValue = (index: number) => {
    if (values[index] !== "X") return Number(values[index]);
    return values[index];
  };

  const squares = useMemo(() => {
    if (variableQuantity === 2) {
      return [
        [
          [getValue(0), "0", "0"],
          [getValue(2), "1", "0"],
        ],
        [
          [getValue(1), "0", "1"],
          [getValue(3), "1", "1"],
        ],
      ];
    } else if (variableQuantity === 3) {
      return [
        [
          [getValue(0), "00", "0"],
          [getValue(2), "01", "0"],
          [getValue(6), "11", "0"],
          [getValue(4), "10", "0"],
        ],
        [
          [getValue(1), "00", "1"],
          [getValue(3), "01", "1"],
          [getValue(7), "11", "1"],
          [getValue(5), "10", "1"],
        ],
      ];
    } else if (variableQuantity === 4) {
      return [
        [
          [getValue(0), "00", "00"],
          [getValue(4), "01", "00"],
          [getValue(12), "11", "00"],
          [getValue(8), "10", "00"],
        ],
        [
          [getValue(1), "00", "01"],
          [getValue(5), "01", "01"],
          [getValue(13), "11", "01"],
          [getValue(9), "10", "01"],
        ],
        [
          [getValue(3), "00", "11"],
          [getValue(7), "01", "11"],
          [getValue(15), "11", "11"],
          [getValue(11), "10", "11"],
        ],
        [
          [getValue(2), "00", "10"],
          [getValue(6), "01", "10"],
          [getValue(14), "11", "10"],
          [getValue(10), "10", "10"],
        ],
      ];
    }
  }, [values]);

  return squares;
};

export default useSquares;
