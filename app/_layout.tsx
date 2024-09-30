import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useColorScheme } from "@/hooks/useColorScheme";

import GridScreen from "./GridScreen";
import ResultScreen from "./ResultScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
        options={{
          headerShown: false,
        }}
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
