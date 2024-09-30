import { Colors } from "@/app/colors";
import useStore from "@/app/store";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Subtitle from "./Subtitle";

const ResultRow = () => {
  const { vectorResult } = useStore();
  return (
    <>
      {vectorResult.length > 0 && (
        <View style={styles.resultContainer}>
          <Subtitle>Resultado</Subtitle>
          <View style={styles.resultVector}>
            {vectorResult.map((item, index) => (
              <Text key={index} style={{ ...styles.resultItem, ...item.style }}>
                {item.value}
              </Text>
            ))}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.PrimaryLightColor,
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
  resultVector: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  resultItem: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ResultRow;
