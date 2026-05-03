import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'react-native-linear-gradient';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import QuickActions from '../components/QuickActions';
import IssueCard from '../components/IssueCard';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'http://172.16.234.135:5000'; // 🔥 replace

export default function HomeScreen({ navigation }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      setLoading(true); // 🔥 ye add karo
      const res = await axios.get(`${BASE_URL}/api/issues`);
      setIssues(res.data);
    } catch (err) {
      console.log('ERROR:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const upvote = async id => {
    try {
      await axios.post(`${BASE_URL}/api/issues/upvote/${id}`);
      fetchIssues(); // refresh
    } catch (err) {
      console.log('Upvote error:', err.message);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const renderItem = ({ item }) => <IssueCard item={item} />;

  return (
    <ScrollView style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <SearchBar />
      <QuickActions navigation={navigation}/>

      <View style={{ marginTop: -30, padding: 15 }}>
        {/* rest of UI */}

        <View style={styles.container}>
          <Text style={styles.header}>CivicSense</Text>

          {/* 🔥 Add Issue Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#0F7B5F',
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowRadius: 5,
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate('AddIssue')}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Add New Issue
            </Text>
          </TouchableOpacity>
          ;

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={issues}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
});
