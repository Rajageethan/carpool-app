import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, 
  ScrollView, Dimensions, Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

const ProfileScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const profileStats = [
    { icon: 'car-sport-outline', label: 'Rides Offered', count: '15' },
    { icon: 'car-outline', label: 'Rides Taken', count: '23' },
    { icon: 'wallet-outline', label: 'Wallet', count: '$250' },
    { icon: 'settings-outline', label: 'Settings' },
  ];

  useEffect(() => {
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

  return React.createElement(ScrollView, { style: styles.container },
    React.createElement(View, { style: styles.gradient },
      // Profile Header with white icon
      React.createElement(Animated.View, { 
        style: [styles.header, { opacity: fadeAnim }] 
      },
        React.createElement(View, { style: styles.profileSection },
          React.createElement(View, { style: styles.profileWrapper },
            React.createElement(View, { style: styles.profileContainer },
              React.createElement(View, { style: styles.profileImageBorder },
                React.createElement(View, { style: styles.profileImage },
                  React.createElement(Ionicons, { 
                    name: "person", 
                    size: 80, 
                    color: "#ffffff"
                  })
                ),
                React.createElement(TouchableOpacity, { style: styles.cameraIconWrapper },
                  React.createElement(View, { style: styles.cameraIconBorder },
                    React.createElement(Ionicons, {
                      name: "camera",
                      size: 20,
                      color: "#ffffff"
                    })
                  )
                )
              )
            )
          )
        ),
        React.createElement(Text, { style: styles.name }, "Hariharasudhan"),
        React.createElement(Text, { style: styles.email }, "hariharasudhan2212@gmail.com")
      ),
      
      // Stats Grid with white icons
      React.createElement(Animated.View, {
        style: [styles.gridContainer, { transform: [{ translateY: slideAnim }] }]
      }, profileStats.map((item, index) => 
        React.createElement(TouchableOpacity, { key: index },
          React.createElement(View, { style: styles.card },
            React.createElement(Ionicons, {
              name: item.icon,
              size: 28,
              color: "#ffffff"  // Changed to white
            }),
            item.count && React.createElement(Text, { 
              style: styles.cardCount 
            }, item.count),
            React.createElement(Text, { 
              style: styles.cardLabel 
            }, item.label)
          )
        )
      )),

      // License Card
      React.createElement(View, { style: styles.licenseCard },
        React.createElement(Text, { 
          style: styles.licenseTitle 
        }, "Driver's License"),
        React.createElement(View, { style: styles.licenseDetails },
          React.createElement(Text, { 
            style: styles.licenseText 
          }, "DL: XXXXX-XXXXX-XXXXX"),
          React.createElement(Text, { 
            style: styles.licenseText 
          }, "Valid till: 12/2025")
        )
      ),

      // Logout Button with red background
      React.createElement(TouchableOpacity, { style: styles.logoutButton },
        React.createElement(View, { style: styles.logoutContent },
          React.createElement(Ionicons, {
            name: "log-out-outline",
            size: 24,
            color: "rgb(255, 4, 4)"  // Changed to white
          }),
          React.createElement(Text, { 
            style: styles.logoutText 
          }, "Logout")
        )
      )
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    minHeight: height,
    padding: 20,
    backgroundColor: '#000000', // Changed to darkest black
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileWrapper: {
    padding: 4,
    borderRadius: 85,
    backgroundColor: 'rgba(25, 25, 25, 0.3)',
  },
  profileContainer: {
    position: 'relative',
    padding: 3,
  },
  profileImageBorder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(25, 25, 25, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: -20,
    right: 35,
    backgroundColor: '#000000',
    borderRadius: 20,
    padding: 2,
  },
  cameraIconBorder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.8)',
    borderWidth: 2,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(25, 25, 25, 0.5)', // Darker overlay
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  cardCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
  },
  licenseCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(25, 25, 25, 0.5)', // Darker overlay
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  licenseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  licenseDetails: {
    gap: 5,
  },
  licenseText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  logoutButton: {
    height: 60,
    marginBottom: 30,
  },
  logoutContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(180, 38, 38, 0.24)',  // Changed to red
    borderWidth: 1,
    borderColor: '#ff0000',
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgb(255, 0, 0)',  // Changed to white
  },
});

export default ProfileScreen;