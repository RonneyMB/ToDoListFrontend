import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WrapperScreen from "../../Env/WrapperScreen";
import LogoAsset from "@/assets/LogoAsset";
import React from "react";
import { AppScreenProps } from "../Navigation/types";

export default function LoginScreen({ navigation }: AppScreenProps<"LoginScreen">) {
  return (
    <WrapperScreen color="#F7374F" statusBarColor="light">
      <View style={styles.container}>
        <View style={{ flex: 8, justifyContent: "center", gap: 10 }}>
          <LogoAsset color="#ffff" />
          <Text style={styles.title}>Programa de organización de tareas</Text>
          <View style={{ width: "80%" }}>
            <Text style={styles.subtitle}>Usted actualmente posee tareas pendientes.</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <Text style={styles.buttonTitle}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: { color: "#EEEEEE", fontWeight: "bold", fontSize: 18, marginTop: 10 },
  subtitle: { color: "#EEEEEE", fontSize: 16, fontWeight: "300" },
  button: { backgroundColor: "#ffff", padding: 18, borderRadius: 9999, alignItems: "center" },
  buttonTitle: { color: "#F7374F", fontWeight: "bold", fontSize: 16 },
});
