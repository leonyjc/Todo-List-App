import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";

export default function FormInput({ input_label, input_value, onChangeText, keyboardType }) {
  return (
    <>
      <Text style={styles.taskLabel}>{input_label}</Text>
      <TextInput
        style={styles.taskInput}
        value={input_value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  );
}

const styles = StyleSheet.create({
  taskLabel: {
    color: "#3F0013",
    paddingVertical : 5,
    fontSize: 14,

  },
  taskInput: {
    backgroundColor: "#fff",
    color: "#3F0013",
    padding: 10,
    fontSize: 14,
    borderRadius: 5,
    alignItems: "center", // Center the date text
  },
});
