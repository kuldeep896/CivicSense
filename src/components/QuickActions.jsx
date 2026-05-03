import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const actions = [
  { title: 'Report', icon: 'report', color: '#0F7B5F' },
  { title: 'Nearby', icon: 'location-on', color: '#3B82F6' },
  { title: 'Top', icon: 'trending-up', color: '#F59E0B' },
  { title: 'Mine', icon: 'person', color: '#EF4444' },
];

export default function QuickActions() {
  const navigation = useNavigation();

  const handlePress = title => {
    if (title === 'Report') {
      navigation.navigate('AddIssue');
    }
  };

  return (
    <View style={styles.container}>
      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(item.title)}
        >
          <View style={[styles.iconBox, { backgroundColor: item.color }]}>
            <Icon name={item.icon} size={20} color="white" />
          </View>

          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    width: "22%",
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    elevation: 4,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
  },
});
