import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormDatePicker({ theDate, setTheDate }) {
  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setTheDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };
  return (
    <>
      <Text style={styles.taskLabel}>Task Due Date:</Text>
      <TouchableOpacity style={styles.taskInput} onPress={showDatePicker}>
        <Text style={{ color: "#3F0013" }}>{theDate.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={theDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  taskInput: {
    backgroundColor: "#fff",
    color: "#3F0013",
    margin: 4,
    padding: 10,
    borderRadius: 5,
    alignItems: "center", // Center the date text
  },
  taskLabel: {
    color: "#3F0013",
    paddingTop: 10,
    paddingLeft: 4,
  },
});
