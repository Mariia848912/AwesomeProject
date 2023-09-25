// import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// import RegistrationScreen from "./screens/AuthScreens/RegistrationScreen";
// import LoginScreen from "./screens/AuthScreens/LoginScreen";
// import HomeScreen from "./screens/HomeScreens/HomeScreens";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import Main from "./screens/HomeScreens/Main";

// const AuthStack = createStackNavigator(); // вказує на групу навігаторів

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
      <Provider store={store}>
        <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </>
  );
}
