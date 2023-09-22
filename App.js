import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/AuthScreens/RegistrationScreen";
import LoginScreen from "./screens/AuthScreens/LoginScreen";
import HomeScreen from "./screens/HomeScreens/HomeScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";

const AuthStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  console.log("hello");
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </>
  );
}
