import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
const AuthStack = createStackNavigator(); // вказує на групу навігаторів
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../../redux/auth/operations";
import { selectStateChange } from "../../redux/auth/selectors";

import RegistrationScreen from "../AuthScreens/RegistrationScreen";
import LoginScreen from "../AuthScreens/LoginScreen";
import HomeScreen from "./HomeScreens";

export default function Main() {
  const dispatch = useDispatch();
  const stateChange = useSelector(selectStateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {!stateChange ? (
          <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <AuthStack.Screen
              name="Registration"
              component={RegistrationScreen}
            />
            <AuthStack.Screen name="Login" component={LoginScreen} />
          </AuthStack.Navigator>
        ) : (
          <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Home" component={HomeScreen} />
          </AuthStack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
