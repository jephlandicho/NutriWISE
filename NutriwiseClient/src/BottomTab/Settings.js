import React, { useEffect, useState,Alert } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('client.db');

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
      const userData = await AsyncStorage.getItem('clientInfoo');
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
  const handleDeleteTables = () => {
    db.transaction((tx) => {
      
      const tablesToDelete = ['meal_planned'];
  
      tablesToDelete.forEach((table) => {
        const query = `DROP TABLE IF EXISTS ${table};`;
  
        tx.executeSql(query, [], (_, resultSet) => {
          console.log(`Table ${table} deleted.`);
        }, (error) => {
          console.error(`Error deleting ${table}:`, error);
        });
      });
    }, (error) => {
      console.error('Transaction error:', error);
    }, () => {
      // Transaction successful
      console.log('All tables have been deleted.');
    });
  };

  const clearClientInfo = async () => {
    try {
      await AsyncStorage.removeItem('clientInfoo');
      // After removing the item, you can set the userData state to null
      setUserData(null);
      console.log('clientInfoo cleared');
    } catch (error) {
      console.error('Error clearing clientInfoo:', error);
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

  const syncTable = () => {
    markRecordsAsSynced();
};

const markRecordsAsSynced = async () => {
  try {
    // await updateTable('client');
    // await updateTable('client_measurements');
    // await updateTable('exchanges');
    await updateTable('distribution_exchange');
    await updateTable('meal_title');
    await updateTable('meal');
    await updateTable('meal_plan');
    console.log('All records marked as synced');
  } catch (error) {
    console.log('Error marking records as synced:', error);
  }
};

const updateTable = async (tableName) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${tableName} SET syncData = 0 WHERE syncData = 1;`,
        [],
        (_, { rowsAffected }) => {
          console.log(`${rowsAffected} records in ${tableName} marked as synced`);
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
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
          <Text style={styles.userDataItem}>ID: {userData.ClientID}</Text>
          <Text style={styles.userDataItem}>Name: {userData.name}</Text>
          <Text style={styles.userDataItem}>Birthdate: {userData.birthdate}</Text>
          <Text style={styles.userDataItem}>Sex: {userData.sex}</Text>
          <Text style={styles.userDataItem}>Student: {userData.fullName}</Text>
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