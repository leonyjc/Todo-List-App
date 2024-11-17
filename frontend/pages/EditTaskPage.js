import axios from "axios";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import FormDatePicker from "../components/FormDatePicker"
import FormInput from "../components/FormInput"

export default function EditTaskPage({ route, navigation }) {
  const task = route.params.task;
  console.log(task);
  const [taskName, setTaskName] = useState(task.taskname);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(new Date(task.due_date));
  const updateTask = async () => {
    try {
      editedTask = {
        taskname: taskName,
        priority: priority,
        due_date: dueDate.toISOString().slice(0, 10),
      };
      await axios.put(`http://localhost:8080/${task.id}`, editedTask);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <FormInput
        input_label="Task Name:"
        input_value={`${taskName}`}
        onChangeText={setTaskName}
      />

      <FormInput
        input_label="Task Priority:"
        input_value={`${priority}`}
        onChangeText={(value) => setPriority(Number(value))} // Convert back to number
        keyboardType="numeric"
      />
      <FormDatePicker
        theDate={dueDate}
        setTheDate={setDueDate}
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
