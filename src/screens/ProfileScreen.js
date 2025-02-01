import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { auth, firestore } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [userData, setUserData] = useState({});
  const [licensePhoto, setLicensePhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    };

    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLicensePhoto(result.uri);
      await updateDoc(doc(firestore, 'users', auth.currentUser.uid), {
        licensePhoto: result.uri,
        isVerified: false,
      });
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>User Profile</Text>
      {userData.profilePicture && (
        <Image source={{ uri: userData.profilePicture }} style={styles.profileImage} />
      )}
      <Text style={[styles.text, { color: colors.text }]}>Name: {userData.name}</Text>
      <Text style={[styles.text, { color: colors.text }]}>Email: {userData.email}</Text>
      <TouchableOpacity onPress={pickImage} style={styles.card}>
        <Text style={[styles.cardText, { color: colors.text }]}>
          {userData.licensePhoto ? 'Update Driver\'s License Photo' : 'Upload Driver\'s License Photo'}
        </Text>
        {userData.licensePhoto && (
          <Image source={{ uri: userData.licensePhoto }} style={styles.licenseImage} />
        )}
      </TouchableOpacity>
      <Button title="Logout" onPress={handleLogout} />
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
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  licenseImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export default ProfileScreen;