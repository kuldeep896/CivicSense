import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function IssueCard({ item, navigation }) {
  const getSeverityColor = severity => {
    if (severity >= 4) return '#EF4444'; // High
    if (severity >= 2) return '#F59E0B'; // Medium
    return '#10B981'; // Low
  };

  const getSeverityText = severity => {
    if (severity >= 4) return 'High';
    if (severity >= 2) return 'Medium';
    return 'Low';
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('IssueDetail', { issue: item })}
    >
      {/* LEFT IMAGE */}
      <Image
        source={{
          uri:
            item.image ||
            '"https://cdn-icons-png.flaticon.com/512/565/565547.png"',
        }}
        style={styles.image}
      />

      {/* RIGHT CONTENT */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Category */}
        <Text style={styles.category}>{item.category}</Text>

        {/* Location (optional future) */}
        <Text style={styles.location}>📍 Haryana</Text>

        {/* Bottom row */}
        <View style={styles.row}>
          {/* Severity Badge */}
          <View
            style={[
              styles.badge,
              { backgroundColor: getSeverityColor(item.severity) + '15' },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: getSeverityColor(item.severity) },
              ]}
            >
              {getSeverityText(item.severity)}
            </Text>
          </View>

          {/* Upvotes */}
          <Text style={styles.upvotes}>⬆ {item.upvotes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 15,
    elevation: 5,
  },

  image: {
    width: 110,
    height: 90,
    borderRadius: 10,
  },

  content: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  category: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },

  location: {
    color: '#999',
    fontSize: 11,
    marginTop: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  upvotes: {
    color: '#0F7B5F',
    fontWeight: 'bold',
  },
});
