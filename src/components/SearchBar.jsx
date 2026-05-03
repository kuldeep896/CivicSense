import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#777" />

      <TextInput
        placeholder="Search issues..."
        placeholderTextColor="#999"
        style={styles.input}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: 'white',
    marginHorizontal: 15,
    marginTop: -25, // 🔥 floating effect

    paddingHorizontal: 15,
    borderRadius: 15,
    height: 55,
    elevation: 6, // shadow
  },
  input: {
    marginLeft: 10,
    flex: 1,
    height: 45,
  },
});
