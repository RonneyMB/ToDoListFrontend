import { View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import type { StatusBarStyle } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

interface PropsOfWrapper {
  children: React.ReactNode;
  color?: string;
  statusBarColor?: StatusBarStyle;
}

export default function WrapperScreen({ children, color, statusBarColor = "auto" }: PropsOfWrapper): React.JSX.Element {
  return (
    <View style={{ backgroundColor: color, flex: 1 }}>
      <SafeAreaView />
      <StatusBar animated={true} backgroundColor="transparent" style={statusBarColor} />
      {children}
    </View>
  );
}
