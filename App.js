import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";

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
      {/* <LoginScreen /> */}
      <RegistrationScreen />
    </>
  );
}
{
  /* <Image source={ImageP} /> */
}

{
  /* <Image source={require("./bg2.jpg")} /> */
}
