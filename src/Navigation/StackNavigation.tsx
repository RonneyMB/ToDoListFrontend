import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Home/HomeScreen";
import LoginScreen from "../Layout/LoginScreen";
import React from "react";

type RootStackLoginList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackLoginList>();

export default function StackNavigation(): React.JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
