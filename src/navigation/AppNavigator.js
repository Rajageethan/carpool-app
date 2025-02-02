import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import OfferRideScreen from '../screens/OfferRideScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 8,
      },
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
    }}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeScreen}
      options={{
        tabBarLabel: 'Find Ride',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="OfferRideTab" 
      component={OfferRideScreen}
      options={{
        tabBarLabel: 'Offer Ride',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="car-sport-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

// Root Stack Navigator
const AppNavigator = () => (
  <Stack.Navigator 
    initialRouteName="Landing"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Landing" component={LandingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="MainApp" component={TabNavigator} />
    <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;