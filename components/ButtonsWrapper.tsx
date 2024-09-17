import React from "react";
import { StyleSheet, View } from "react-native";
import Subtitle from "./Subtitle";

interface ButtonsWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ButtonsWrapper = ({ title, children }: ButtonsWrapperProps) => {
  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
      <Subtitle>{title}</Subtitle>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
    paddingHorizontal: 10,
  },
});
export default ButtonsWrapper;
