import { Colors } from "@/app/colors";
import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title?: string;
  active?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = "Save" } = props;
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, props.active && styles.active]}
    >
      <Text style={[styles.text, props.active ? styles.activeText : {}]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: Colors.PrimaryButtonColor,
    borderWidth: 1,
    flex: 1,
    height: 30,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    textAlign: "center",
    color: Colors.PrimaryButtonColor,
  },
  activeText: {
    color: "white",
  },
  active: {
    backgroundColor: Colors.PrimaryButtonColor,
  },
});
