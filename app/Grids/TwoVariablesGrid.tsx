import React from "react";
import { View, Text } from "react-native";
import variablesStyles from "./styles";
import GridBox from "@/components/GridBox";
import DiagonalBox from "./DiagonalBox";

interface TwoVariablesProps {
  onPress: (index: number) => void;
  values: string[];
  vars: number;
}

export default function TwoVariablesGrid({
  onPress,
  values,
  vars,
}: TwoVariablesProps) {
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
        <GridBox total={vars} values={values} onPress={onPress} index={0} />
        <GridBox total={vars} values={values} onPress={onPress} index={2} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>1</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={1} />
        <GridBox total={vars} values={values} onPress={onPress} index={3} />
      </View>
    </View>
  );
}
