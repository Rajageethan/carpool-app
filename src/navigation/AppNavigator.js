import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

// Import screens
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import OfferRideScreen from '../screens/OfferRideScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';
// import { Settings } from 'react-native';
import SettingsScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileScreen} 
        options={{ headerShown: false }} 
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitle: 'Settings',
          headerShown: true,
          headerLeft: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 16, marginRight: 16 }}
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </View>
          ),
          headerTitleStyle: {
            marginLeft: 16
          }
        })}
      />
    </ProfileStack.Navigator>
  );
};

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#1a1a1a',
        borderTopWidth: 0,
        height: 80,
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
      name="Profile" 
      component={ProfileStackNavigator}
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