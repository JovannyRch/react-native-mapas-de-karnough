import useStore from "@/app/store";
import { BoxColor, Position } from "@/app/types/types";
import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Colors: string[] = [
  "red",
  "blue",
  "green",
  "orange",
  "#50C878",
  "lightblue",
  "#CD7F32",
  "#ff6699",
];

interface GridBoxProps {
  values: string[];
  index: number;
  onPress: (index: number) => void;
  total: number;
  row: number;
  column: number;
}

const GridBox = ({
  values,
  index,
  onPress,
  total,
  row,
  column,
}: GridBoxProps) => {
  const { result, boxColors } = useStore();

  const boxes: BoxColor[] = useMemo(() => {
    return boxColors.filter((box) => {
      return box.row == row && box.column == column;
    });
  }, [boxColors, row, column]);

  console.log("boxes", boxes);

  const getStyle = (value: number | string) => {
    if (result) {
      return styles.box;
    }

    if (value == 1) {
      return { ...styles.box, backgroundColor: "#5271FF" };
    }
    if (value == "X") {
      return { ...styles.box, backgroundColor: "#9ee493" };
    }
    return styles.box;
  };

  const parseBin = (number: number) => {
    let bin = number.toString(2);
    while (bin.length < total) {
      bin = "0" + bin;
    }
    return bin;
  };

  const getValueStyle = () => {
    let style: any = {
      fontSize: 25,
      textAlign: "center",
      color: "black",
    };

    if (values[index] == "1" && !result) style = { ...style, color: "white" };
    return style;
  };

  return (
    <View style={{ ...getStyle(values[index]) }}>
      <TouchableOpacity style={styles.touch} onPress={() => onPress(index)}>
        <Text
          style={{
            ...styles.index,
            ...(values[index] == "1" && !result ? { color: "white" } : {}),
          }}
        >
          {/*  {total != 5 ? `${parseBin(index)} - ${index} ` : index} */}
          {index}
        </Text>
        <View style={styles.containerText}>
          <Text style={getValueStyle()}>{values[index]}</Text>
        </View>
        {boxes.map(({ style }) => (
          <View key={index} style={{ ...styles.overlayBox, ...style }} />
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
});
export default GridBox;
