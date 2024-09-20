import React from "react";
import { View, Text } from "react-native";
import variablesStyles from "./styles";
import GridBox from "@/components/GridBox";
import DiagonalBox from "./DiagonalBox";

export default function ThreeVariablesGrid({
  onPress,
  values,
  vars,
}: {
  onPress: (index: number) => void;
  values: string[];
  vars: number;
}) {
  return (
    <>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <DiagonalBox text1="C" text2="AB" />
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>00</Text>
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>01</Text>
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>11</Text>
        </View>
        <View style={variablesStyles.vars}>
          <Text style={variablesStyles.varText}>10</Text>
        </View>
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>0</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={0} />
        <GridBox total={vars} values={values} onPress={onPress} index={1} />
        <GridBox total={vars} values={values} onPress={onPress} index={3} />
        <GridBox total={vars} values={values} onPress={onPress} index={2} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>1</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={4} />
        <GridBox total={vars} values={values} onPress={onPress} index={5} />
        <GridBox total={vars} values={values} onPress={onPress} index={7} />
        <GridBox total={vars} values={values} onPress={onPress} index={6} />
      </View>
    </>
  );
}
