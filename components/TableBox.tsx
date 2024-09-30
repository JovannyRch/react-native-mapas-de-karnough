import { Colors } from "@/app/colors";
import useStore from "@/app/store";
import { nextSquareState } from "@/app/utils";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    textAlign: "center",
    padding: 0,
    margin: 0,
    color: Colors.PrimaryButtonColor,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export const TableBox = ({ index }: { index: number }) => {
  const { values, setValues } = useStore();

  const handleOnPress = (index: number) => {
    const newValues = [...values];
    newValues[index] = nextSquareState(values[index]);
    setValues(newValues);
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{values[index]}</Text>
      </View>
    </TouchableOpacity>
  );
};
