import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import TwoVariablesGrid from "./Grids/TwoVariablesGrid";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewMode } from "./types/types";
import ButtonsWrapper from "@/components/ButtonsWrapper";
import Button from "@/components/Button";
import useUpdateEffect from "./hooks/useUpdateEffect";
import { KMaps } from "./utils/KMaps";
import SelectDropdown from "react-native-select-dropdown";
import ThreeVariablesGrid from "./Grids/ThreeVariablesGrid";
import FourVariables from "./Grids/FourVariablesGrid";
import { Colors } from "./colors";
import Subtitle from "@/components/Subtitle";
import useStore from "./store";

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
  const [variableQuantity, setVariableQuantity] = useState(2);

  const [values, setValues] = useState<string[]>(["0", "0", "0", "0"]);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [resultType, setResultType] = useState<"SOP" | "POS">("SOP");
  const [squares, setSquares] = useState<(number | string)[][][]>([]);
  const { result, clearResult, setResult } = useStore();

  const onPress = (index: number) => {
    let newValues = [...values];
    newValues[index] = nextState(newValues[index]);
    setValues(newValues);
    clearResult();
  };

  const nextState = (value: string) => {
    if (value == "0") return "1";
    if (value == "1") return "X";
    if (value == "X") return "0";

    return "0";
  };

  const setAll = (value: string) => {
    let newValues = values.map(() => value);
    setValues(newValues);
  };

  useUpdateEffect(() => {
    setValues(Array.from({ length: 2 ** variableQuantity }, () => "0"));
  }, [variableQuantity]);

  const getValue = (index: number) => {
    if (values[index] !== "X") return Number(values[index]);
    return values[index];
  };

  const handleGetResult = (solutionType: "POS" | "SOP") => {
    const kMap = new KMaps(variableQuantity, solutionType, squares);
    kMap.Algorithm();
    setResult(kMap.getMathExpression());
    /* navigation.navigate("ResultScreen", {
      result: kMap.getMathExpression(),
      resultType,
      kMap,
    }); */
  };

  useEffect(() => {
    if (variableQuantity === 2) {
      setSquares([
        [
          [getValue(0), "0", "0"],
          [getValue(2), "1", "0"],
        ],
        [
          [getValue(1), "0", "1"],
          [getValue(3), "1", "1"],
        ],
      ]);
    } else if (variableQuantity === 3) {
      setSquares([
        [
          [getValue(0), "00", "0"],
          [getValue(2), "01", "0"],
          [getValue(6), "11", "0"],
          [getValue(4), "10", "0"],
        ],
        [
          [getValue(1), "00", "1"],
          [getValue(3), "01", "1"],
          [getValue(7), "11", "1"],
          [getValue(5), "10", "1"],
        ],
      ]);
    } else if (variableQuantity === 4) {
      setSquares([
        [
          [getValue(0), "00", "00"],
          [getValue(4), "01", "00"],
          [getValue(5), "11", "00"],
          [getValue(8), "10", "00"],
        ],
        [
          [getValue(1), "00", "01"],
          [getValue(5), "01", "01"],
          [getValue(1), "11", "01"],
          [getValue(9), "10", "01"],
        ],
        [
          [getValue(3), "00", "11"],
          [getValue(7), "01", "11"],
          [getValue(1), "11", "11"],
          [getValue(11), "10", "11"],
        ],
        [
          [getValue(2), "00", "10"],
          [getValue(6), "01", "10"],
          [getValue(1), "11", "10"],
          [getValue(10), "10", "10"],
        ],
      ]);
    }
  }, [values]);

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
        {/* <ButtonsWrapper title="Valores">
        <Button onPress={() => setAll("1")} title="1s" />
        <Button onPress={() => setAll("0")} title="0s" />
        <Button onPress={() => setAll("X")} title="Xs" />
      </ButtonsWrapper>
 */}
        <View style={styles.gridContainer}>
          {variableQuantity == 2 && (
            <TwoVariablesGrid
              onPress={onPress}
              values={values}
              vars={variableQuantity}
            />
          )}
          {variableQuantity == 3 && (
            <ThreeVariablesGrid
              onPress={onPress}
              values={values}
              vars={variableQuantity}
            />
          )}
          {variableQuantity == 4 && (
            <FourVariables
              onPress={onPress}
              values={values}
              vars={variableQuantity}
            />
          )}
        </View>

        {result && (
          <View style={styles.resultContainer}>
            <Subtitle>Resultado</Subtitle>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 5 }}>
              {result}
            </Text>
          </View>
        )}

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
        <View style={styles.resultButtonContainer}>
          <Button
            onPress={() => handleGetResult(resultType)}
            title="Obtener resultado"
            active
          />
        </View>
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
  resultContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.PrimaryLightColor,
    margin: 10,
    padding: 5,
    borderRadius: 10,
  },
});
