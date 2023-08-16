import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/AuthScreens/RegistrationScreen";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import HomeScreen from "./screens/HomeScreens/HomeScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <AuthStack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen
            name="Registration"
            component={RegistrationScreen}
          />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Home" component={HomeScreen} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </>
  );
}
