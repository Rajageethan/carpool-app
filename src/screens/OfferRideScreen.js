import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const OfferRideScreen = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '',
    price: '',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#000000', '#000000']}
          style={styles.gradient}
        >
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.title}>Offer a Ride</Text>
              <Text style={styles.subtitle}>Share your journey with others</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <View style={styles.inputWrapper}>
                  <Ionicons name="location-outline" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="From"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.from}
                    onChangeText={(text) => setFormData({...formData, from: text})}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <Ionicons name="location" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="To"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.to}
                    onChangeText={(text) => setFormData({...formData, to: text})}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputWrapper, styles.halfWidth]}>
                  <Ionicons name="calendar-outline" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="Date"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.date}
                    onChangeText={(text) => setFormData({...formData, date: text})}
                  />
                </View>

                <View style={[styles.inputWrapper, styles.halfWidth]}>
                  <Ionicons name="time-outline" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="Time"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    value={formData.time}
                    onChangeText={(text) => setFormData({...formData, time: text})}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputWrapper, styles.halfWidth]}>
                  <Ionicons name="people-outline" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="Available Seats"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="numeric"
                    value={formData.seats}
                    onChangeText={(text) => setFormData({...formData, seats: text})}
                  />
                </View>

                <View style={[styles.inputWrapper, styles.halfWidth]}>
                  <Ionicons name="cash-outline" size={24} color="#6366f1" />
                  <TextInput
                    style={styles.input}
                    placeholder="Price per Seat"
                    placeholderTextColor="rgba(255, 255, 255, 0.5)"
                    keyboardType="numeric"
                    value={formData.price}
                    onChangeText={(text) => setFormData({...formData, price: text})}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Publish Ride</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  halfWidth: {
    width: '48%',
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

export default OfferRideScreen;