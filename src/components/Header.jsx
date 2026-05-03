import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>📍 Jaipur, Rajasthan</Text>

      <Text style={styles.greeting}>Hello, Citizen 👋</Text>
      <Text style={styles.subtitle}>
        Let's make our city better together
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0F7B5F",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height:200,
  },
  location: {
    color: "white",
    fontSize: 14,
  },
  greeting: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    color: "white",
    marginTop: 5,
  },
});