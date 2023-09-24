import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import {
  selectUserId,
  selectNikename,
  selectEmail,
} from "../../redux/auth/selectors";
export default function PostScreen() {
  const userId = useSelector(selectUserId);
  const nikename = useSelector(selectNikename);
  const email = useSelector(selectEmail);

  console.log("nikename", nikename);
  console.log("userId", userId);
  console.log("email", email);

  return (
    <View style={styles.container}>
      <Text>PostScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
