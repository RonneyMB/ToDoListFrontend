import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";
import { DeleteModal } from "./DeleteModal";

export interface DataOfTask {
  _id: string;
  title: string;
  description?: string;
  important?: boolean;
  completed?: boolean;
}

interface UpdateTaskData {
  important?: boolean;
  completed?: boolean;
}

interface PropsOfTask {
  row: DataOfTask;
  fn: () => void;
  isLast: boolean;
}

export default function TaskElement({ row, fn, isLast }: PropsOfTask) {
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const updateTask = async (data: UpdateTaskData): Promise<void> => {
    axios
      .put(`/api/items/update/${row._id}`, data)
      .then(() => {
        fn();
      })
      .catch((error: unknown) => console.error(error));
  };

  return (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 16 }}
      onLongPress={() => {
        setShowDelete(true);
      }}
      activeOpacity={1}
    >
      <DeleteModal
        show={showDelete}
        id={row._id}
        fn={fn}
        onHide={() => {
          setShowDelete(false);
        }}
      />
      <View style={{ alignItems: "center", width: 23 }}>
        <View style={{ width: 25, height: 25, borderRadius: 11.5, backgroundColor: row.completed ? "#F7374F" : "#d9d6d0" }} />
        {isLast && <View style={{ width: 4, flex: 1, backgroundColor: "#d9d6d0", marginTop: 14.5 }} />}
      </View>
      <View style={[styles.container, { backgroundColor: row.completed ? "#F7374F" : "#ffff" }]}>
        <View>
          <Text style={[styles.title, { color: row.completed ? "#ffff" : "#F7374F" }]}>{row.title}</Text>
        </View>
        <Text style={{ color: row.completed ? "#ffff" : "#A2A2A2" }}>{row.description}</Text>
        <View style={styles.containerOfActions}>
          <TouchableOpacity
            onPress={() => {
              updateTask({ important: !row.important });
            }}
          >
            <MaterialCommunityIcons name={row.important ? "star" : "star-outline"} size={30} color={row.completed ? "#ffff" : "#F7374F"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonCheck, { borderColor: row.completed ? "#ffff" : "#F7374F" }]}
            onPress={() => {
              updateTask({ completed: !row.completed });
            }}
          >
            {row.completed && <MaterialCommunityIcons name="check-bold" size={20} color="#ffff" />}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 26,
    flex: 1,
    gap: 2,
  },
  title: {
    color: "#F7374F",
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonCheck: {
    borderWidth: 3,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9999,
  },
  containerOfActions: { alignSelf: "flex-end", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
});
