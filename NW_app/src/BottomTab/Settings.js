import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

import { useNavigation } from '@react-navigation/native';

 const Settings = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
   useEffect(() => {
    getUserData();
    getNotificationSettings();
  }, []);
   const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist in local storage
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
   const getNotificationSettings = async () => {
    try {
      const notificationsEnabled = await AsyncStorage.getItem('notificationsEnabled');
      if (notificationsEnabled) {
        setNotificationsEnabled(JSON.parse(notificationsEnabled));
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteTable = () => {
        const createClassesTableQuery = `
        DROP TABLE classes;`;

      return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
          transaction.executeSql(createClassesTableQuery, [], resolve, (_, error) => reject(error));
        });
      });
  };

   const toggleNotifications = async () => {
    try {
      const newNotificationsEnabled = !notificationsEnabled;
      setNotificationsEnabled(newNotificationsEnabled);
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(newNotificationsEnabled));
    } catch (error) {
      console.error('Error:', error);
    }
  };
   return (
    <View style={styles.container}>
      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.label}>User Data:</Text>
          <Text style={styles.userDataItem}>Full Name: {userData.fullName}</Text>
          <Text style={styles.userDataItem}>Email: {userData.email}</Text>
          <Text style={styles.userDataItem}>Username: {userData.username}</Text>
        </View>
      )}
       <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeading}>User Settings:</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Enable Notifications:</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            thumbColor="#f4f3f4"
            trackColor={{ false: '#767577', true: '#81b0ff' }}
          />
        </View>
        <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Change Password')}>
          <Text style={styles.settingLabel}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Privacy Settings')}>
          <Text style={styles.settingLabel}>Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={deleteTable}>
          <Text style={styles.settingLabel}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userDataContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userDataItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 3,
  },
  settingsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingLabel: {
    fontSize: 16,
  },
});
 export default Settings;