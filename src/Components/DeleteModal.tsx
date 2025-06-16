import { View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

interface PropsOfModals {
  show: boolean;
  id: string;
  fn: () => void;
  onHide: () => void;
}

export const DeleteModal = ({ show, id, fn, onHide }: PropsOfModals) => {
  const deleteTask = async () => {
    axios
      .delete(`/api/items/delete/${id}`)
      .then(() => {
        onHide(), fn();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Modal statusBarTranslucent={true} animationType="fade" transparent={true} visible={show} onRequestClose={onHide}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.ModalContainer}>
        <View style={styles.ModalContentContainer}>
          <View style={{ justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text>¿Esta seguro que desea eliminar esta tarea?</Text>
            </View>
            <TouchableOpacity onPress={deleteTask}>
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#686D76" }}>Eliminar tarea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  ModalContentContainer: { backgroundColor: "white", padding: 20, borderRadius: 10 },
});
