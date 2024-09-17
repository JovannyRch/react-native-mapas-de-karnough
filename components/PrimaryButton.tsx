import React from "react";
import { StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";

interface ButtonVarProps {
  text: string;
  onPress: () => void;
  noActive?: boolean;
}

const PrimaryButton = ({ text, onPress, noActive = false }: ButtonVarProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, noActive && styles.noActive]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  button: {
    width: Dimensions.get("window").width * 0.6,
    fontSize: 20,
    marginBottom: 15,
    borderRadius: 20,
    borderColor: "#3880ff",
    borderWidth: 2,
    height: 50,
    justifyContent: "center",
  },
  text: {
    color: "#3880ff",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "400",
  },
  noActive: {
    backgroundColor: "#f0f0f0",
  },
});
