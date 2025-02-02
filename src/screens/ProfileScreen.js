import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, 
  ScrollView, Dimensions, Animated, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, firestore } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const ProfileScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [userData, setUserData] = useState(null);

  const profileStats = [
    { icon: 'car-sport-outline', label: 'Rides Offered', count: '15' },
    { icon: 'car-outline', label: 'Rides Taken', count: '23' },
    { icon: 'wallet-outline', label: 'Wallet', count: '$250' },
    { icon: 'settings-outline', label: 'Settings', onPress: () => navigation.navigate('Settings') }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestore, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.gradient}>
          <Animated.View style={[styles.header, { opacity: fadeAnim }]}> 
            <View style={styles.profileSection}>
              <View style={styles.profileWrapper}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileImageBorder}>
                    <View style={styles.profileImage}>
                      <Ionicons name="person" size={80} color="#ffffff" />
                    </View>
                    <TouchableOpacity style={styles.cameraIconWrapper}>
                      <View style={styles.cameraIconBorder}>
                        <Ionicons name="camera" size={20} color="#ffffff" />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.name}>{userData?.fullName || 'Loading...'}</Text>
            <Text style={styles.email}>{userData?.email || 'Loading...'}</Text>
          </Animated.View>

          <Animated.View style={[styles.gridContainer, { transform: [{ translateY: slideAnim }] }]}> 
            {profileStats.map((item, index) => (
              <TouchableOpacity key={index} style={styles.card} onPress={item.onPress}>
                <Ionicons name={item.icon} size={28} color="#ffffff" />
                {item.count && <Text style={styles.cardCount}>{item.count}</Text>}
                <Text style={styles.cardLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>

          <View style={styles.licenseCard}>
            <Text style={styles.licenseTitle}>Driver's License</Text>
            <View style={styles.licenseDetails}>
              <Text style={styles.licenseText}>DL: XXXXX-XXXXX-XXXXX</Text>
              <Text style={styles.licenseText}>Valid till: 12/2025</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <View style={styles.logoutContent}>
              <Ionicons name="log-out-outline" size={24} color="rgb(255, 0, 0)" />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  gradient: { minHeight: height, padding: 20, backgroundColor: '#000000' },
  header: { alignItems: 'center', marginTop: 40, marginBottom: 30 },
  profileSection: { alignItems: 'center', marginTop: 40 },
  profileWrapper: { padding: 4, borderRadius: 85, backgroundColor: 'rgba(25, 25, 25, 0.3)' },
  profileContainer: { position: 'relative', padding: 3 },
  profileImageBorder: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center' },
  profileImage: { width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(25, 25, 25, 0.5)', alignItems: 'center', justifyContent: 'center' },
  cameraIconWrapper: { position: 'absolute', bottom: -20, right: 35, backgroundColor: '#000000', borderRadius: 20, padding: 2 },
  cameraIconBorder: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 28, fontWeight: '700', color: '#ffffff', marginTop: 15 },
  email: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 5 },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  card: { width: CARD_WIDTH, height: CARD_WIDTH, borderRadius: 20, padding: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(25, 25, 25, 0.5)',marginBottom:15 },
  cardCount: { fontSize: 24, fontWeight: '700', color: '#ffffff', marginTop: 10 },
  cardLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 5 },
  licenseCard: { padding: 20, borderRadius: 20, backgroundColor: 'rgba(25, 25, 25, 0.5)', marginBottom: 20,height: 125 },
  licenseTitle: { fontSize: 18, fontWeight: '600', color: '#ffffff', marginBottom: 10 },
  licenseText: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  logoutButton: { height: 60, marginBottom: 30 },
  logoutContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(180, 38, 38, 0.24)', borderWidth: 1, borderColor: '#ff0000' ,height: 60 },
  logoutText: { fontSize: 16, fontWeight: '600', color: 'rgb(255, 0, 0)' }
});

export default ProfileScreen;
