import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.gradient}
      >
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>ShareWheels</Text>
            <Text style={styles.tagline}>Your journey begins here</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              The smart way to{'\n'}
              share your ride
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <BlurView intensity={100} style={styles.buttonBlur}>
              <Text style={styles.buttonText}>Get Started</Text>
            </BlurView>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
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
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: height * 0.1,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  descriptionContainer: {
    marginTop: height * 0.1,
  },
  description: {
    fontSize: 36,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 44,
  },
  button: {
    marginBottom: 50,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  buttonBlur: {
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  }
});

export default LandingScreen;