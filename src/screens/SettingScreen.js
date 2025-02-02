import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SettingScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const settingSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
        { icon: 'car-outline', label: 'Car Details', screen: 'CarDetails' },
        { icon: 'card-outline', label: 'Payment Methods', screen: 'PaymentMethods' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'moon-outline', label: 'Dark Mode', isSwitch: true, value: isDarkMode, onToggle: setIsDarkMode },
        { icon: 'notifications-outline', label: 'Notifications', isSwitch: true, value: notifications, onToggle: setNotifications },
        { icon: 'globe-outline', label: 'Language', screen: 'Language' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', screen: 'HelpCenter' },
        { icon: 'shield-checkmark-outline', label: 'Privacy', screen: 'Privacy' },
        { icon: 'information-circle-outline', label: 'About', screen: 'About' },
      ],
    },
  ];

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.label}
      style={styles.settingItem}
      onPress={() => item.screen && navigation.navigate(item.screen)}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={item.icon} size={24} color="#fff" />
        <Text style={styles.settingLabel}>{item.label}</Text>
      </View>
      {item.isSwitch ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={item.value ? '#1a73e8' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={24} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {settingSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map(renderSettingItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(25, 25, 25, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 16,
    color: '#fff',
  },
  headerContainer: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,

  }
});

export default SettingScreen;