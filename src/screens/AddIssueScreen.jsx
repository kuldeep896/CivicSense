import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { launchImageLibrary } from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://172.16.234.135:5000';

export default function AddIssueScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [severity, setSeverity] = useState(1); // 🔥 number
  const [image, setImage] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && response.assets) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const categories = ['Road', 'Water', 'Electricity', 'Garbage'];

  const fallbackLocation = () => {
    console.log('USING FALLBACK');

    setLat(28.61);
    setLng(77.23);

    Alert.alert('Using default location');
  };

  const getLocation = () => {
    console.log('GET LOCATION CALLED');

    Geolocation.getCurrentPosition(
      position => {
        console.log('SUCCESS:', position);

        if (!position || !position.coords) {
          fallbackLocation();
          return;
        }

        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      error => {
        console.log('ERROR:', error);
        Alert.alert('Location error');

        fallbackLocation();
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  };
  const requestLocationPermission = async () => {
    try {
      const alreadyGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (alreadyGranted) {
        console.log('Already granted');
        getLocation();
        return;
      }

      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      console.log('Permission result:', result);

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      } else {
        Alert.alert('Permission denied from system');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getSeverityLabel = val => {
    if (val >= 4) return 'High 🔴';
    if (val >= 2) return 'Medium 🟡';
    return 'Low 🟢';
  };

  const handleSubmit = async () => {
    if (!title || !description || !category) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (!lat || !lng) {
      Alert.alert('Error', 'Please get location first');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/issues/report`, {
        title,
        description,
        category,
        severity,
        lat,
        lng,
        image,
      });

      setLoading(false);

      Alert.alert('Success', 'Issue reported successfully 🎉', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);

      setTitle('');
      setDescription('');
      setCategory('');
      setSeverity(1);
      setImage(null);
      setLat(null);
      setLng(null);

      navigation.goBack();
    } catch (err) {
      console.log(err.response?.data);
      Alert.alert('Error', 'Failed to add issue');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Report an Issue</Text>

      <TextInput
        placeholder="Issue Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.categoryContainer}>
        {categories.map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryBtn,
              category === item && styles.activeCategory,
            ]}
            onPress={() => setCategory(item)}
          >
            <Text style={{ color: category === item ? 'white' : 'black' }}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔥 Severity */}
      <Text style={styles.label}>
        Severity: {severity} ({getSeverityLabel(severity)})
      </Text>

      <Slider
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={severity}
        onValueChange={setSeverity}
      />

      <TouchableOpacity
        style={styles.imageBtn}
        onPress={requestLocationPermission}
      >
        <Text>📍 Get Current Location</Text>
      </TouchableOpacity>

      <Text style={styles.locationText}>
        {lat && lng ? `Lat: ${lat}, Lng: ${lng}` : 'Location not selected'}
      </Text>

      {/* 🔥 Image */}
      <TouchableOpacity style={styles.imageBtn} onPress={pickImage}>
        <Text>📷 Select Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {/* Submit button */}

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: loading ? '#aaa' : '#0F7B5F' },
        ]}
        onPress={handleSubmit}
        disabled={loading}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit Issue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  imageBtn: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 150,
    marginTop: 10,
    borderRadius: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },

  categoryBtn: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
    margin: 5,
  },

  activeCategory: {
    backgroundColor: '#0F7B5F',
  },

  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },

  locationText: {
    marginTop: 5,
    color: '#555',
  },
});
