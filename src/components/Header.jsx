import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Header() {
  return (
    <LinearGradient
      colors={["#0F7B5F", "#1DBF73"]} // 🔥 gradient
      style={styles.container}
    >
      <Text style={styles.location}>📍 Jaipur, Rajasthan</Text>

      <Text style={styles.greeting}>Hello, Citizen 👋</Text>

      <Text style={styles.subtitle}>
        Let’s make our city better together
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height:300,
    elevation: 6
  },
  location: {
    color: "white",
    fontSize: 14,
    opacity: 0.9,
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
    opacity: 0.9,
  },
});