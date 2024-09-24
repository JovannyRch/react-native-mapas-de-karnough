import { CircuitComponent } from "@/components/Circuit";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

interface ResultScreenProps {
  route: any;
}

const ResultScreen = ({ route }: ResultScreenProps) => {
  const { result, resultType, kMap } = route.params;
  return (
    <SafeAreaView>
      <Text style={styles.result}>{kMap.getMathExpression()}</Text>
      <CircuitComponent
        variables={["A", "B", "C"]}
        initGroups={"(A'.B)+(A.B)"}
        isMaxiterm={resultType == "POS"}
      />
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
