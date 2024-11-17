import axios from "axios";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";

export default function EditTaskPage({ route, navigation }) {
  const task = route.params.task;
  console.log(task);
  const [taskName, setTaskName] = useState(task.taskname);
  const updateTask = async () => {
    try {
      editedTask = {
        taskname: "hhhhhh",
        due_date: "2024-11-5",
      };
      await axios.put(`http://localhost:8080/${task.id}`, editedTask);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text style={styles.taskLabel}>Task Name:</Text>
      <TextInput
        style={styles.taskInput}
        value={taskName}
        onChangeText={setTaskName}
      />
      <TouchableOpacity style={styles.saveButton} onPress={updateTask}>
        <Text style styles="styles.saveButtonText">
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 10,
  },
  taskLabel: {
    color: "#3F0013",
    paddingTop: 10,
    paddingLeft: 4,
  },
  taskInput: {
    backgroundColor: "#fff",
    color: "#3F0013",
    margin: 4,
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // Center the date text
  },
});
