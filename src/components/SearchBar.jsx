import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search issues..."
        placeholderTextColor="#777"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: -25,
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 5,
  },
  input: {
    height: 50,
  },
});