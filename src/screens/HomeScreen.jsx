import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
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

export default function HomeScreen() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/issues`);
      setIssues(res.data);
    } catch (err) {
      console.log('ERROR:', err.message);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchIssues();
    }, []),
  );

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <FlatList
      data={issues}
      keyExtractor={item => item._id}
      renderItem={({ item }) => <IssueCard item={item} />}
      ListHeaderComponent={
        <>
          <Header />
          <SearchBar />
          <QuickActions />
        </>
      }
      contentContainerStyle={{
        backgroundColor: '#F5F5F5',
        paddingBottom: 20,
      }}
      ListEmptyComponent={
        loading ? (
          <ActivityIndicator size="large" color="#0F7B5F" style={{ marginTop: 20 }} />
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No issues found
          </Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
});
