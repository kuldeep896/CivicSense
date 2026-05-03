import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://172.16.234.135:5000'; // same as HomeScreen

export default function AddIssueScreen({ navigation }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    if (!title) {
      Alert.alert('Error', 'Title required');
      return;
    }

    try {
      await axios.post(`${BASE_URL}/api/issues/report`, {
        title,
        description: 'User reported issue',
        category: 'general',
        lat: 28.61, // 🔥 add this
        lng: 77.23, // 🔥 add this
        severity: 3,
      });
      Alert.alert('Success', 'Issue added');

      setTitle('');

      navigation.navigate('Home'); // 🔥 go back
    } catch (err) {
      console.log(err.message);
      Alert.alert('Error', 'Failed to add issue');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Issue</Text>

      <TextInput
        placeholder="Enter issue title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: 'white' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E3A8A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});
