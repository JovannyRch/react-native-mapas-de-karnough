import React from "react";
import { View, Text } from "react-native";
import variablesStyles from "./styles";
import GridBox from "@/components/GridBox";
import DiagonalBox from "./DiagonalBox";

export default function TwoVariablesGrid() {
  return (
    <View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <DiagonalBox text1="B" text2="A" />
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>0</Text>
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>1</Text>
        </View>
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>0</Text>
        </View>
        <GridBox index={0} row={0} column={0} />
        <GridBox index={2} row={0} column={1} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>1</Text>
        </View>
        <GridBox index={1} row={1} column={0} />
        <GridBox index={3} row={1} column={1} />
      </View>
    </View>
  );
}
