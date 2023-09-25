import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectNikename,
  selectEmail,
} from "../../redux/auth/selectors";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreen from "../nestedScreen/DefaultPostScreen";
import CommentScreen from "../nestedScreen/CommentScreen";
import MapScreen from "../nestedScreen/MapsScreen";

import { authSignOutUser } from "../../redux/auth/operations";

import { Feather } from "@expo/vector-icons";
const NestedScreen = createStackNavigator();

export default function PostScreen({ navigation }) {
  const userId = useSelector(selectUserId);
  const nikename = useSelector(selectNikename);
  const email = useSelector(selectEmail);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <NestedScreen.Navigator initialRouteName="DefaultPosts">
        <NestedScreen.Screen
          name="DefaultScreen"
          component={DefaultScreen}
          options={{
            title: "Публікації",
            headerLeft: false,
            headerRight: () => (
              <TouchableOpacity
                style={styles.btnLogOut}
                activeOpacity={0.8}
                onPress={signOut}
              >
                <Feather name="log-out" size={24} color="#212121" />
              </TouchableOpacity>
            ),
          }}
        />
        <NestedScreen.Screen
          name="Comment"
          component={CommentScreen}
          options={{
            title: "Коментарі",
          }}
        />
        <NestedScreen.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Карта",
          }}
        />
      </NestedScreen.Navigator>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: "#fff",
  },
  btnLogOut: {
    marginRight: 16,
  },
  icon: {
    color: "#fff",
  },
});
