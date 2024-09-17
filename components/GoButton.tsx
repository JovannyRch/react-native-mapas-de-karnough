import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import PrimaryButton from "./PrimaryButton";

interface GoButtonProps {
  onPress1: () => void;
  onPress2: () => void;
}

const GoButton = ({ onPress1, onPress2 }: GoButtonProps) => {
  return (
    <View style={styles.container}>
      <PrimaryButton text={"SOP"} onPress={onPress1} />
      <PrimaryButton text={"POS"} onPress={onPress2} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2f4858",
    borderRadius: 100,
    width: Dimensions.get("window").width * 0.5,
    height: 50,
    justifyContent: "center",
    padding: 5,
    marginBottom: 13,
  },
  container: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: Dimensions.get("window").width * 0.25,
  },
});

export default GoButton;
