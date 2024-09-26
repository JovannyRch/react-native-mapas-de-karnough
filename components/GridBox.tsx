import useStore from "@/app/store";
import { BoxColor } from "@/app/types/types";
import { nextSquareState } from "@/app/utils";
import React, { useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface GridBoxProps {
  index: number;

  row: number;
  column: number;
}

const GridBox = ({ index, row, column }: GridBoxProps) => {
  const { boxColors, values, setValues, resultType } = useStore();

  const boxes: BoxColor[] = useMemo(() => {
    return boxColors.filter((box) => {
      return box.row == row && box.column == column;
    });
  }, [boxColors, row, column]);

  const handleOnPress = (index: number) => {
    const newValues = [...values];
    newValues[index] = nextSquareState(values[index]);
    setValues(newValues);
  };

  const value = values[index];

  return (
    <View style={styles.box}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => handleOnPress(index)}
      >
        <Text
          style={{
            ...styles.index,
          }}
        >
          {index}
        </Text>
        <View style={styles.containerText}>
          <Text
            style={{
              ...styles.value,
              fontWeight:
                resultType === "SOP" && value === "1"
                  ? "bold"
                  : resultType === "POS" && value === "0"
                  ? "bold"
                  : "normal",
            }}
          >
            {value}
          </Text>
        </View>
        {boxes.map(({ style, row, column }) => (
          <View
            key={`#${row},${column},${style.borderColor}`}
            style={{ ...styles.overlayBox, ...style }}
          />
        ))}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 60,
    borderWidth: 0.3,
    borderColor: "black",
    justifyContent: "center",

    backgroundColor: "#C7D0D8",
  },
  touch: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  containerText: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },

  index: {
    textAlign: "left",
    width: "auto",
    paddingLeft: 3,
    fontSize: 12,
    position: "absolute",
    top: 2,
    left: 2,
  },
  overlayBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
  },
  value: {
    fontSize: 23,
    textAlign: "center",
    color: "black",
  },
});
export default GridBox;
