import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface PropsOfModals {
  show: boolean;
  fn: () => void;
  onHide: () => void;
}

interface DataCreateTask {
  title: string;
  description?: string;
  important: boolean | false;
}

interface HandleChangeProps {
  name: keyof DataCreateTask;
  value: string | boolean;
}

export const ModalCustom = ({ show, fn, onHide }: PropsOfModals) => {
  const [description, setDescription] = useState<boolean>(false);
  const [important, setImportant] = useState<boolean>(false);
  const [data, setData] = useState<DataCreateTask | {}>({});
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(
        () => {
          inputRef.current?.focus();
        },
        Platform.OS === "android" ? 300 : 100
      );
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleChange = (name: HandleChangeProps["name"], value: HandleChangeProps["value"]) => {
    setData((prev) => ({
      ...prev,
      [name]: value, // Notación de corchetes para propiedad dinámica
    }));
  };

  const closeModal = () => {
    setData({}), onHide(), setDescription(false);
  };

  const createTask = async () => {
    axios
      .post("/api/items/create-item", data)
      .then(() => {
        closeModal(), fn();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal statusBarTranslucent={true} animationType="fade" transparent={true} visible={show} onRequestClose={closeModal}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.ModalContainer}>
        <View style={styles.ModalContentContainer}>
          <TextInput ref={inputRef} style={[styles.InputCustom, { fontSize: 18 }]} placeholder="Nueva tarea" placeholderTextColor="#8E8E93" onChangeText={(text) => handleChange("title", text)} />
          {description && <TextInput style={[styles.InputCustom, { fontSize: 14 }]} placeholder="Agregar descripción de la tarea" placeholderTextColor="#8E8E93" autoFocus={true} onChangeText={(text) => handleChange("description", text)} />}
          <View style={{ marginTop: 5, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setDescription(true);
                }}
              >
                <MaterialCommunityIcons name="text" size={24} color="#686D76" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name={important ? "star" : "star-outline"}
                  size={24}
                  color="#686D76"
                  onPress={() => {
                    setImportant((prevImportant) => {
                      const newValue = !prevImportant;
                      handleChange("important", newValue); // Usamos el nuevo valor
                      return newValue;
                    });
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={createTask}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#686D76" }}>Crear tarea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalContainer: { flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  ModalContentContainer: { backgroundColor: "white", padding: 20, borderTopEndRadius: 25, borderTopStartRadius: 25, width: "100%" },
  InputCustom: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    color: "#8E8E93",
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
});
