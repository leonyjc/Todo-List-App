import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import FormInput from "../components/FormInput";
import FormDatePicker from "../components/FormDatePicker";

export default function HomePage({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  function formatDate(date) {
    return date.toLocaleDateString();
  }

  const deletedTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(`Error deleting task ${error}`);
    }
  };

  const addTask = async () => {
    if (taskName && priority && dueDate) {
      const newTask = {
        taskname: taskName,
        priority: parseInt(priority),
        due_date: `${dueDate.getFullYear()}-${String(
          dueDate.getMonth() + 1
        ).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`,
      };

      try {
        await axios.post("http://localhost:8080/", newTask);
        fetchTasks();
        setTaskName("");
        setPriority("");
        setDueDate(new Date());
        setErrorMessage("");
      } catch (error) {
        console.error("Error adding task:", error);
        setErrorMessage("Failed to add the task. Please try again.");
      }
    } else {
      setErrorMessage("Please fill in all fields");
    }
  };

  function extractTaskName(task) {
    return (
      <View style={styles.task_item_container} key={task.id}>
        <View>
          <Text style={styles.task_field}>Task Name: {task.taskname}</Text>
          <Text style={styles.task_field}>Task Priority: {task.priority}</Text>
          <Text style={styles.task_field}>
            Task Due: {formatDate(new Date(task.due_date))}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.task_edit_button}
          onPress={() => navigation.navigate("EditTask", { task })}
        >
          <Text style={styles.task_edit_text}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.task_deleted_button}
          onPress={() => deletedTask(task.id)}
        >
          <Text style={styles.task_deleted_text}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scroll_view}>
        <ScrollView>
          {tasks.length > 0 ? (
            tasks.map((task) => extractTaskName(task))
          ) : (
            <Text>No tasks available</Text>
          )}
        </ScrollView>
      </View>
      <FormInput
        input_label="Task Name:"
        input_value={taskName}
        onChangeText={setTaskName}
      />

      <FormInput
        input_label="Task Priority:"
        input_value={priority}
        onChangeText={setPriority}
        keyboardType="numeric"
      />

      <FormDatePicker
        theDate={dueDate}
        setTheDate={setDueDate}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A1A8BE",
    paddingHorizontal: 20,
  },

  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red", // Style for error messages
    marginVertical: 10,
  },
  scroll_view: {
    height: 420,
  },
  task_item_container: {
    backgroundColor: "#272727",
    margin: 10,
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  task_field: {
    color: "#fff",
    fontSize: 16,
  },
  task_deleted_button: {
    backgroundColor: "#ff0000",
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  task_edit_button: {
    backgroundColor: "#000000",
    borderColor: "white",
    borderWidth: 1,
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  task_edit_text: {
    color: "white",
    fontSize: 10,
  },
  task_deleted_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
