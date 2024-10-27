import axios from "axios";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function EditTaskPage({ route , navigation}) {
  const updateTask = async () =>{
    try {
      editedTask = {
        taskname: "hhhhhh",
        due_date: "2024-11-5"
    }
      await axios.put(`http://localhost:8080/${task.id}`, editedTask);
      navigation.goBack();
    }catch(error){
      console.error(error)
    }
  }
  const task = route.params.task;
  return (
    <View>
      <Text>Task Id: {task.id}</Text>
      <Text>Task Name: {task.taskname}</Text>

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
});
