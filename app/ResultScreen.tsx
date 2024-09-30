import { CircuitComponent } from "@/components/Circuit";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import useStore from "./store";
import ResultRow from "@/components/ResultRow";

const ResultScreen = () => {
  return (
    <SafeAreaView>
      <ResultRow />
      <CircuitComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  result: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    textAlign: "center",
    fontSize: 20,
  },
});

export default ResultScreen;
