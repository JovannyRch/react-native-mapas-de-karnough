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
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={0}
          row={0}
          column={0}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={2}
          row={0}
          column={1}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={6}
          row={0}
          column={2}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={4}
          row={0}
          column={3}
        />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>1</Text>
        </View>
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={1}
          row={1}
          column={0}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={3}
          row={1}
          column={1}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={7}
          row={1}
          column={2}
        />
        <GridBox
          total={vars}
          values={values}
          onPress={onPress}
          index={5}
          row={1}
          column={3}
        />
      </View>
    </>
  );
}
