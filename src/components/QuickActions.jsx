import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const actions = [
  { title: 'Report Issue' },
  { title: 'Nearby Issues' },
  { title: 'Top Issues' },
  { title: 'My Issues' },
];

const handlePress = title => {
  if (title === 'Report Issue') {
    navigation.navigate('AddIssue');
  }
};

export default function QuickActions({ navigation }) {
  return (
    <View style={styles.container}>
      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(item.title)}
        >
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    width: '23%',
    alignItems: 'center',
    elevation: 3,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
