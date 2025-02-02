import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { auth, firestore } from '../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    vehicleDetails: {
      make: '',
      model: '',
      plateNumber: ''
    }
  });

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Create user document in Firestore
      const userRef = doc(firestore, 'users', user.uid);
      await setDoc(userRef, {
        email: formData.email,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber || '',
        vehicleDetails: {
          make: formData.vehicleDetails.make || '',
          model: formData.vehicleDetails.model || '',
          plateNumber: formData.vehicleDetails.plateNumber || ''
        },
        createdAt: serverTimestamp(),
        isVerified: false
      });

      Alert.alert('Success', 'Registration successful');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({...prev, fullName: text}))}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData(prev => ({...prev, phoneNumber: text}))}
              keyboardType="phone-pad"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.password}
              onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData(prev => ({...prev, confirmPassword: text}))}
              secureTextEntry
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Vehicle Make"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.vehicleDetails.make}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                vehicleDetails: {...prev.vehicleDetails, make: text}
              }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Vehicle Model"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.vehicleDetails.model}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                vehicleDetails: {...prev.vehicleDetails, model: text}
              }))}
            />
            <TextInput
              style={styles.input}
              placeholder="License Plate Number"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={formData.vehicleDetails.plateNumber}
              onChangeText={(text) => setFormData(prev => ({
                ...prev,
                vehicleDetails: {...prev.vehicleDetails, plateNumber: text}
              }))}
            />
          </>
        );
      case 4:
        return (
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Review Your Details</Text>
            
            <View style={styles.reviewSection}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(1)}
              >
                <View>
                  <Text style={styles.label}>Full Name</Text>
                  <Text style={styles.value}>{formData.fullName}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(1)}
              >
                <View>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{formData.email}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(1)}
              >
                <View>
                  <Text style={styles.label}>Phone Number</Text>
                  <Text style={styles.value}>{formData.phoneNumber}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.sectionTitle}>Vehicle Details</Text>
              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(3)}
              >
                <View>
                  <Text style={styles.label}>Make</Text>
                  <Text style={styles.value}>{formData.vehicleDetails.make}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(3)}
              >
                <View>
                  <Text style={styles.label}>Model</Text>
                  <Text style={styles.value}>{formData.vehicleDetails.model}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.reviewItem}
                onPress={() => setStep(3)}
              >
                <View>
                  <Text style={styles.label}>Plate Number</Text>
                  <Text style={styles.value}>{formData.vehicleDetails.plateNumber}</Text>
                </View>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleRegister}
            >
              <Text style={styles.confirmButtonText}>Confirm & Register</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Step {step} of 4</Text>
            </View>

            <View style={styles.formContainer}>
              {renderStep()}
            </View>

            <View style={styles.buttonContainer}>
              {step > 1 && (
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => setStep(prev => prev - 1)}
                >
                  <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => {
                  if (step < 4) {
                    setStep(prev => prev + 1);
                  } else {
                    handleRegister();
                  }
                }}
              >
                <Text style={styles.buttonText}>
                  {step === 4 ? 'Register' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.loginContainer}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    minHeight: height,
  },
  headerContainer: {
    marginTop: height * 0.1,
    marginBottom: 32,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  formContainer: {
    marginTop: 32,
  },
  input: {
    height: 54,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 16,
  },
  imageButton: {
    height: 54,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
  button: {
    flex: 1,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgba(99, 102, 241, 0.8)',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  loginText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  loginLink: {
    color: '#ffffff',
    fontWeight: '600',
  },
  reviewContainer: {
    padding: 20,
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  reviewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 12,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#ffffff',
  },
  editText: {
    fontSize: 14,
    color: '#6366f1',
  },
  confirmButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  }
});

export default RegisterScreen;