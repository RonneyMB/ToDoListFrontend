import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import WrapperScreen from "../../Env/WrapperScreen";
import LogoAsset from "@/assets/LogoAsset";
import Filter from "@/src/Components/Filters";
import TaskElement, { DataOfTask } from "../Components/TaskElement";
import { ModalCustom } from "../Components/Modals";
import axios from "axios";

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<DataOfTask[] | []>([]);
  const [filterType, setFilterType] = useState("Todas");
  const [search, setSearch] = useState<string>("");

  const TypeFilter = [
    { title: "Todas", fx: () => setFilterType("Todas") },
    { title: "Completadas", fx: () => setFilterType("Completadas") },
    { title: "No completadas", fx: () => setFilterType("No completadas") },
  ];

  const getTasks = async () => {
    axios
      .get("/api/items/")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <WrapperScreen color="#EEEEEE" statusBarColor="dark">
      <ModalCustom
        show={visible}
        fn={getTasks}
        onHide={() => {
          setVisible(false);
        }}
      />
      <View style={styles.HeaderContainer}>
        <LogoAsset width={107.22} height={102.2} color="#F7374F" />
        <TouchableOpacity style={styles.ButtonAddTask} onPress={() => setVisible(true)}>
          <Text style={{ color: "#ffff", fontWeight: "bold" }}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 15, gap: 10 }}>
        <TextInput style={styles.SearchInput} placeholder="Buscar" placeholderTextColor="#8E8E93" onChangeText={(text) => setSearch(text)} />
        <Filter>
          {TypeFilter.map((data, index) => (
            <Filter.Button key={index} placeholder={data.title} onPress={data.fx} />
          ))}
        </Filter>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        <View style={{ padding: 15, gap: 14 }}>
          {data
            .filter((row) => {
              if (filterType === "Todas") return true;
              if (filterType === "Completadas") return row.completed === true;
              if (filterType === "No completadas") return row.completed === false;
              return true;
            })
            .filter((row) => search === "" || row.title.includes(search))
            .map((row, index, filteredArray) => (
              <TaskElement key={index} row={row} fn={getTasks} isLast={index !== filteredArray.length - 1} />
            ))}
        </View>
      </ScrollView>
    </WrapperScreen>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: { padding: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  ButtonAddTask: { backgroundColor: "#F7374F", padding: 20, paddingHorizontal: 24, borderRadius: 9999 },
  SearchInput: {
    height: 55,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 9999,
    fontSize: 17,
    color: "#000000",
  },
});
