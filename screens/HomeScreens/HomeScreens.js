import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostScreen from "../MainScreens/PostScreen";
import CreatePostsScreen from "../MainScreens/CreatePostsScreen";
import ProfileScreen from "../MainScreens/ProfileScreen";

const MainTab = createBottomTabNavigator();
import { Feather } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <MainTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        activeTintColor: "#FF6C00",
        inactiveTintColor: "#212121",
      })}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
        name="Posts"
        component={PostScreen}
      />
      <MainTab.Screen
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <Feather
              style={styles.arrowLeft}
              name="arrow-left"
              size={24}
              color="black"
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.btnCreate}>
              <Feather
                style={styles.icon}
                name="plus"
                size={size}
                color={color}
              />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}

/* 
(
    <MainTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "rgba(33, 33, 33, 0.8)",
        tabBarInactiveTintColor: "rgba(33, 33, 33, 0.8)",
      })}
    >
      <MainTab.Screen
        name="Posts"
        component={PostScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <Feather
              style={styles.logOut}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          ),
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },

          //   headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerLeft: () => (
            <Feather
              style={styles.arrowLeft}
              name="arrow-left"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
              onPress={() => navigation.navigate("Posts")}
            />
          ),
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: {
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
          },

          tabBarIcon: ({ focused, size, color }) => (
            <View style={styles.btnCreate}>
              <Feather
                style={styles.icon}
                name="plus"
                size={size}
                color={color}
              />
            </View>
          ),
        }}
      ></MainTab.Screen>
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
*/
// const styles = StyleSheet.create({
//   logOut: {
//     marginRight: 16,
//   },
//   icon: {
//     color: "#ffffff",
//   },
//   btnCreate: {
//     width: 70,
//     height: 40,
//     backgroundColor: "#FF6C00",
//     borderRadius: 24,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   arrowLeft: {
//     marginLeft: 16,
//   },
// });
const styles = StyleSheet.create({
  btnLogOut: {
    marginRight: 16,
  },
  icon: {
    color: "#fff",
  },
  btnCreate: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowLeft: {
    marginLeft: 16,
  },
});
