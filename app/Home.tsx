import PrimaryButton from "@/components/PrimaryButton";
import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ navigation }: any) {
  const variables = [2, 3, 4];

  const handleClick = (value: number) => {
    navigation.push("GridScreen", {
      vars: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mapas de Karnaugh</Text>
      <Text style={styles.description}>Elige la cantidad de variables</Text>

      {variables.map((n) => {
        return (
          <PrimaryButton
            key={n}
            text={n.toString()}
            onPress={() => handleClick(n)}
          />
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 25,
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 15,
  },
  title: {
    fontSize: 40,
    color: "#3880ff",
    fontWeight: "bold",
    marginBottom: 40,
  },
});
