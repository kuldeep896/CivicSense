import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IssueCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.location}>📍 Jaipur</Text>

      <View style={styles.row}>
        <Text style={styles.priority}>High</Text>
        <Text style={styles.upvote}>⬆ {item.upvotes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    marginVertical: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    color: "#777",
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  priority: {
    backgroundColor: "#FFE5E5",
    color: "red",
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  upvote: {
    color: "green",
    fontWeight: "bold",
  },
});