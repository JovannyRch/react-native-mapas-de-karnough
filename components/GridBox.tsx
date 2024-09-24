import { Colors } from "@/app/colors";
import useStore from "@/app/store";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface GridBoxProps {
  values: string[];
  index: number;
  onPress: (index: number) => void;
  total: number;
}

const GridBox = ({ values, index, onPress, total }: GridBoxProps) => {
  const { result } = useStore();

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
        <View style={styles.containerText}>
          <Text
            style={{
              ...styles.index,
              ...(values[index] == "1" && !result ? { color: "white" } : {}),
            }}
          >
            {/*  {total != 5 ? `${parseBin(index)} - ${index} ` : index} */}
            {index}
          </Text>
          <Text style={getValueStyle()}>{values[index]}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 60,
    borderWidth: 0.5,
    borderColor: "black",
    justifyContent: "center",
    margin: 3,
    backgroundColor: "#C7D0D8",
    borderRadius: 10,
  },
  touch: { display: "flex", flex: 1, justifyContent: "center" },
  containerText: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  indexText: {
    textAlign: "left",
  },
  index: {
    textAlign: "left",
    width: "auto",
    paddingLeft: 3,
    fontSize: 12,
  },
});
export default GridBox;
