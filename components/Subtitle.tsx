import { Colors } from "@/app/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";

interface SubtitleProps {
  children: React.ReactNode;
}

const Subtitle = ({ children }: SubtitleProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.PrimaryColor,
    fontSize: 18,
    textAlign: "left",
    fontWeight: "500",
  },
});

export default Subtitle;
