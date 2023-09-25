// import React from "react";
// import { TouchableOpacity } from "react-native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// const AuthStack = createStackNavigator();
// const MainTab = createBottomTabNavigator();

// import Registr from "./screens/AuthScreens/RegistrationScreen";
// import Login from "./screens/AuthScreens/LoginScreen";
// import Home from "./screens/HomeScreens/HomeScreens";
// import PostsScreen from "./screens/MainScreens/PostScreen";
// import CreatePostsScreen from "./screens/MainScreens/CreatePostsScreen";
// import ProfileScreen from "./screens/MainScreens/ProfileScreen";

// //icons
// import { Feather } from "@expo/vector-icons";

// export const useRoute = (isAuth) => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Registration"
//           component={Registr}
//         />
//         <AuthStack.Screen
//           options={{
//             headerShown: false,
//           }}
//           name="Login"
//           component={Login}
//         />
//       </AuthStack.Navigator>
//     );
//   }
//   return (
//     <MainTab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Posts") {
//             iconName = "grid";
//           } else if (route.name === "Create") {
//             iconName = "plus";
//           } else if (route.name === "Profile") {
//             iconName = "user";
//           }
//           return <Feather name={iconName} size={size} color={color} />;
//         },
//         tabBarShowLabel: false,
//         activeTintColor: "#FF6C00",
//         inactiveTintColor: "#212121",
//       })}
//     >
//       {/* <MainTab.Screen
//         name="Posts"
//         component={PostsScreen}
//         options={{
//           title: "Публікації",
//           headerRight: () => (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               onPress={() => alert("This is a log-out!")}
//             >
//               <Feather name="log-out" size={24} color="black" />
//             </TouchableOpacity>
//           ),
//         }}
//       /> */}
//       <MainTab.Screen
//         name="Create"
//         component={CreatePostsScreen}
//         options={{
//           title: "Створити публікацію",
//         }}
//       />
//       <MainTab.Screen name="Profile" component={ProfileScreen} />
//     </MainTab.Navigator>
//   );
// };
