import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { firestore } from '../services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [rides, setRides] = useState([]);

  const searchRides = async () => {
    const q = query(
      collection(firestore, 'rides'),
      where('stops', 'array-contains', departure),
      where('stops', 'array-contains', arrival)
    );

    const querySnapshot = await getDocs(q);
    const ridesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRides(ridesList);
  };

  useEffect(() => {
    // Fetch all rides initially
    const fetchRides = async () => {
      const q = query(collection(firestore, 'rides'));
      const querySnapshot = await getDocs(q);
      const ridesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRides(ridesList);
    };

    fetchRides();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Find a Ride</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Departure Location"
          placeholderTextColor={colors.placeholder}
          value={departure}
          onChangeText={setDeparture}
        />
        <TextInput
          style={[styles.input, { borderColor: colors.border, color: colors.text }]}
          placeholder="Arrival Location"
          placeholderTextColor={colors.placeholder}
          value={arrival}
          onChangeText={setArrival}
        />
        <TouchableOpacity style={styles.button} onPress={searchRides}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <FlatList
          data={rides}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.rideItem}
              onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
            >
              <Text style={[styles.rideText, { color: colors.text }]}>
                {item.departure} to {item.arrival}
              </Text>
              <Text style={[styles.rideText, { color: colors.text }]}>
                Departure: {item.departureTime}
              </Text>
              <Text style={[styles.rideText, { color: colors.text }]}>
                Price: ${item.price} per seat
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  rideText: {
    fontSize: 16,
  },
  safeArea: {
    flex: 1,
  },
});

export default HomeScreen;