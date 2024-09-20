import React from "react";
import { View, Text } from "react-native";
import variablesStyles from "./styles";
import GridBox from "@/components/GridBox";
import DiagonalBox from "./DiagonalBox";

export default function FourVariables({ onPress, values, vars }: any) {
  return (
    <>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <DiagonalBox text1="CD" text2="AB" />
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
          <Text style={variablesStyles.varText}>00</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={0} />
        <GridBox total={vars} values={values} onPress={onPress} index={1} />
        <GridBox total={vars} values={values} onPress={onPress} index={3} />
        <GridBox total={vars} values={values} onPress={onPress} index={2} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>01</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={4} />
        <GridBox total={vars} values={values} onPress={onPress} index={5} />
        <GridBox total={vars} values={values} onPress={onPress} index={7} />
        <GridBox total={vars} values={values} onPress={onPress} index={6} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>11</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={12} />
        <GridBox total={vars} values={values} onPress={onPress} index={13} />
        <GridBox total={vars} values={values} onPress={onPress} index={15} />
        <GridBox total={vars} values={values} onPress={onPress} index={14} />
      </View>
      <View style={variablesStyles.row}>
        <View style={variablesStyles.lefColumn}>
          <Text style={variablesStyles.varText}>10</Text>
        </View>
        <GridBox total={vars} values={values} onPress={onPress} index={8} />
        <GridBox total={vars} values={values} onPress={onPress} index={9} />
        <GridBox total={vars} values={values} onPress={onPress} index={11} />
        <GridBox total={vars} values={values} onPress={onPress} index={10} />
      </View>
    </>
  );
}
