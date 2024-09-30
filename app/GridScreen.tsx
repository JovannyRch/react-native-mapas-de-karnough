import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TwoVariablesGrid from "./Grids/TwoVariablesGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonsWrapper from "@/components/ButtonsWrapper";
import Button from "@/components/Button";
import { KMaps } from "./utils/KMaps";
import SelectDropdown from "react-native-select-dropdown";
import ThreeVariablesGrid from "./Grids/ThreeVariablesGrid";
import FourVariables from "./Grids/FourVariablesGrid";
import useStore from "./store";
import useDebounce from "./hooks/useDebounce";
import useSquares from "./hooks/useSquares";
import ResultRow from "@/components/ResultRow";

interface GridScreenProps {
  navigation: any;
}

const dropDownValues = [
  {
    title: "Suma de productos (SOP)",
    value: "SOP",
  },
  {
    title: "Producto de sumas (POS)",
    value: "POS",
  },
];

export default function GridScreen({ navigation }: GridScreenProps) {
  const {
    result,
    setResult,
    setBoxColors,
    variableQuantity,
    setVariableQuantity,
    values,
    setAllValues,
    resultType,
    setResultType,
    setVectorResult,
    vectorResult,
    setCircuitVector,
  } = useStore();

  const squares = useSquares();

  const getResult = (solutionType: "POS" | "SOP") => {
    if (squares) {
      const kMap = new KMaps(variableQuantity, solutionType, squares);
      console.log("Circuit vector", kMap.circuitVector);
      kMap.Algorithm();
      setResult(kMap.getMathExpression());
      setBoxColors(kMap.getBoxColors());
      setVectorResult(kMap.getVectorResult());
      setCircuitVector(kMap.getCircuitVector());
    }
  };

  useDebounce(
    () => {
      getResult(resultType);
    },
    500,
    [squares, resultType]
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ButtonsWrapper title="Cantidad de variables">
          <Button
            onPress={() => setVariableQuantity(2)}
            title="2"
            active={variableQuantity == 2}
          />
          <Button
            onPress={() => setVariableQuantity(3)}
            title="3"
            active={variableQuantity == 3}
          />
          <Button
            onPress={() => setVariableQuantity(4)}
            title="4"
            active={variableQuantity == 4}
          />
        </ButtonsWrapper>
        {/*   <ViewModeSelector
        currentView={viewMode}
        setView={(view) => setViewMode(view)}
      /> */}
        <ButtonsWrapper title="Valores">
          <Button onPress={() => setAllValues("1")} title="1s" />
          <Button onPress={() => setAllValues("0")} title="0s" />
          <Button onPress={() => setAllValues("X")} title="Xs" />
        </ButtonsWrapper>

        <View style={styles.gridContainer}>
          {variableQuantity == 2 && <TwoVariablesGrid />}
          {variableQuantity == 3 && <ThreeVariablesGrid />}
          {variableQuantity == 4 && <FourVariables />}
        </View>

        <ResultRow />

        <ButtonsWrapper title="Tipo de resultado">
          <SelectDropdown
            data={dropDownValues}
            onSelect={(selectedItem, index) => {
              setResultType(selectedItem.value as "SOP" | "POS");
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.title) ||
                      (
                        dropDownValues.find(
                          (item) => item.value === resultType
                        ) || dropDownValues[0]
                      ).title}
                  </Text>
                  <Text style={styles.dropdownButtonArrowStyle}>
                    {isOpened ? "▲" : "▼"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item) => {
              return (
                <View
                  style={
                    resultType === item.value
                      ? [
                          styles.dropdownItemStyle,
                          { backgroundColor: "#D2D9DF" },
                        ]
                      : styles.dropdownItemStyle
                  }
                >
                  <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
          />
        </ButtonsWrapper>
        {result && (
          <View style={styles.resultButtonContainer}>
            <Button
              onPress={() => {
                navigation.navigate("ResultScreen", {
                  result,
                  resultType,
                });
              }}
              title="Mostrar circuito"
              active
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  gridContainer: {
    padding: 10,
    paddingVertical: 30,
    paddingTop: 40,
  },
  dropdownButtonStyle: {
    width: 300,
    height: 50,
    backgroundColor: "#D2D9DF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#D2D9DF",
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  resultButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    paddingHorizontal: 60,
  },
});
