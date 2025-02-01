import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const RideDetailsScreen = ({ route }) => {
  const { colors } = useTheme();
  const { rideId } = route.params;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Ride Details</Text>
      <Text style={[styles.text, { color: colors.text }]}>Ride ID: {rideId}</Text>
      {/* Additional ride details will be displayed here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default RideDetailsScreen;