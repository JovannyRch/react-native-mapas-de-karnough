import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import GridScreen from "./GridScreen";

import ResultScreen from "./ResultScreen";
import { Button, Text } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const MaterialHeaderButton = (props: HeaderButtonProps) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
);

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="GridScreen">
      <Stack.Screen
        name="GridScreen"
        component={GridScreen}
        options={({ navigation }) => ({
          title: "K-Maps",
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{
          title: "Circuito",
        }}
      />
    </Stack.Navigator>
  );
}
