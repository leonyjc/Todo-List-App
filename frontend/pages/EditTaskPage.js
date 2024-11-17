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
  const [showPicker, setShowPicker] = useState(false);
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
  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
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
        onChange={onChange}
        onPress={showDatePicker}
        showPicker={showPicker}
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
