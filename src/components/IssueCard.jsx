import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function IssueCard({ item }) {
  const getColor = severity => {
    if (severity >= 4) return '#EF4444';
    if (severity >= 2) return '#F59E0B';
    return '#10B981';
  };
  return (
    <View style={styles.card}>
      {/* 🔥 Image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300' }}
        style={styles.image}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.location}>📍 Jaipur</Text>

        <View style={styles.row}>
          <Text style={styles.priority}>High</Text>
          <Text style={styles.upvote}>⬆ {item.upvotes}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    color: '#777',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  priority: {
    backgroundColor: '#FFE5E5',
    color: 'red',
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  upvote: {
    color: '#0F7B5F',
    fontWeight: 'bold',
  },
});
