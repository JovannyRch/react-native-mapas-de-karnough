import useStore from "@/app/store";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from "react-native-table-component";
import { TableBox } from "./TableBox";

const decimalToBinary = (decimal: number, length: number) => {
  return decimal.toString(2).padStart(length, "0");
};

const TableView = () => {
  const { variableQuantity, variables } = useStore();

  const header = ["#", variables.join(""), "Resultado"];

  const tableData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < Math.pow(2, variableQuantity); i++) {
      rows.push([i, decimalToBinary(i, variableQuantity), ""]);
    }
    return rows;
  }, [variableQuantity]);

  return (
    <ScrollView>
      <View style={styles.containerTable}>
        <Table borderStyle={styles.table}>
          <Row data={header} style={styles.head} textStyle={styles.headText} />

          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.row}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellIndex === 2 ? <TableBox index={index} /> : cellData}
                  textStyle={styles.text}
                />
              ))}
            </TableWrapper>
          ))}
        </Table>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  headText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  head: {
    height: 40,
    backgroundColor: "#2f4858",
  },
  text: {
    margin: 6,
    textAlign: "center",
    color: "#2f4858",
    fontSize: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: "#2f4858",
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3880ff",
    width: 200,
  },
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  containerText: {
    textAlign: "center",
    padding: 10,
    color: "#3880ff",
  },
  containerTable: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default TableView;
