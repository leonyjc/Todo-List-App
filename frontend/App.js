import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(new Date()); // Default to today's date
  const [showPicker, setShowPicker] = useState(false); // State to control date picker visibility
  const [errorMessage,setErrorMessage] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = async () => {
    if (taskName && priority && dueDate) {
      const newTask = {
        taskname: taskName,
        priority: parseInt(priority), // Ensure priority is a number
        due_date: dueDate.toISOString().split('T')[0] // Format date to YYYY-MM-DD
      };

      try {
        await axios.post("http://localhost:8080/", newTask);
        fetchTasks();
        setTaskName('');
        setPriority('');
        setDueDate(new Date()); // Reset date to today
        setErrorMessage(''); // Clear any error message
      } catch (error) {
        console.error(error);
        setErrorMessage('Failed to add the task. Please try again.'); // Set error message
      }
    } else {
      setErrorMessage('Please fill in all fields'); // Set error message if fields are missing
    }
  };

  function formatDate(date) {
    // Format the date to a readable format
    return date.toLocaleDateString();
  }

  function extractTaskName(task) {
    return (

      <View style={styles.task_item_container} key={task.id}>
        <View>
          <Text style={styles.task_field}>Task Name: {task.taskname}</Text>
          <Text style={styles.task_field}>Task Priority: {task.priority}</Text>
          <Text style={styles.task_field}>Task Due: {formatDate(new Date(task.due_date))}</Text>
        </View>
        <TouchableOpacity style={styles.task_deleted_button}>
          <Text  style={styles.task_deleted_text} > X </Text> 
        </TouchableOpacity>

  
      </View>
    );
  }

  // Function to show the date picker
  const showDatePicker = () => {
    setShowPicker(true);
  };

  // Function to handle date selection
  const onChange = (event, selectedDate) => {
    setShowPicker(false); // Hide the picker
    if (selectedDate) {
      setDueDate(selectedDate); // Set the selected date
    }
  };

  return (
    <View style={styles.container}>
      <View  style={styles.scroll_view}>
      <ScrollView>
      {tasks.length > 0 ? 
        tasks.map((task) => extractTaskName(task)) : 
        <Text>No tasks available</Text>
      } 
      </ScrollView>
      </View>

  
      <Text style={styles.taskLabel}>Task Name:</Text>
      <TextInput 
        style={styles.taskInput} 
        value={taskName}
        onChangeText={setTaskName} // Update state on text change
      />
      <Text style={styles.taskLabel}>Task Priority:</Text>
      <TextInput 
        style={styles.taskInput} 
        value={priority}
        onChangeText={setPriority} // Update state on text change
        keyboardType="numeric" // Ensure input is numeric
      />
      <Text style={styles.taskLabel}>Task Due Date:</Text>
     <TouchableOpacity style={styles.taskInput} onPress={showDatePicker}>
        <Text style={{ color: '#3F0013' }}>{formatDate(dueDate)}</Text> 
      </TouchableOpacity>
      

      {showPicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
   

      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A1A8BE',
    paddingHorizontal: 20,
    paddingTop: 80
  },
  taskLabel: {
    color: "#3F0013",
    marginVertical: 4,
    padding: 10,
  },
  taskInput: {
    backgroundColor: "#fff",
    color: "#3F0013",
    margin: 4,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center', // Center the date text
  },
  space: {
    height: 20,
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red', // Style for error messages
    marginVertical: 10,
  },
  scroll_view:{
    height: 450
  },
  task_item_container:{
    backgroundColor: "#272727",
    margin:10,
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  }, 
  task_field:{
    color: "#fff",
    fontSize: 16
  },

  task_deleted_button :{
    backgroundColor: "#ff0000",
    width :30,
    height: 30,
    borderRadius :"100%",
    justifyContent: "center",
    alignItems:"center"
  },
  task_deleted_text:{
    color: "white",
    fontWeight:"bold",
    fontSize: 20
  }

});
