import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
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
      const userData = await AsyncStorage.getItem('infoClient');
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
      
      const tablesToDelete = ['m_plans'];
  
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
      await AsyncStorage.removeItem('infoClient');
      // After removing the item, you can set the userData state to null
      setUserData(null);
      console.log('infoClient cleared');
    } catch (error) {
      console.error('Error clearing clientInfoo:', error);
    }
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

const showAboutDevelopersAlert = () => {
  const dev = `
  The NutriWISE mobile application was developed by a team of 4th year BSIT-BA students from the Batangas State University The National Engineering University ARASOF-Nasugbu Campus. The team is composed of the following members:
  Jephthah Jehosaphat Landicho
  Clarence Phol Andino
  Cleo Angelo Dimailig
  `
  Alert.alert("About the Developers", dev);
};

const showTermsAndConditionsAlert = () => {
  const termsAndConditions = `

  Privacy Policy for NutriWISE

  Thank you for downloading NutriWISE! Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data while using our application.
  
  1. Information We Collect:
  
  User-Provided Information: NutriWISE may collect information that you provide when using the app. This includes personal details such as name, birthdate, gender, and other relevant information for personalized meal planning.
  
  Food Data: The app utilizes data from the DOST FEL for Meal Planning 4th Edition to provide accurate and reliable nutritional information about various foods.
  
  
  2. Data Security:
  
  We prioritize the security of your data. NutriWISE employs industry-standard measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
  
  4. Data Sharing:
  
  We do not sell, trade, or otherwise transfer your personal information to external parties. Your data is used exclusively for the functionality of NutriWISE.
  
  5. Third-Party Services:
  
  NutriWISE may contain links or integrations with third-party services. Please note that these services have their own privacy policies, and we encourage you to review them.
  
  6. Changes to Privacy Policy:
  
  We reserve the right to update our Privacy Policy. Any changes will be posted on this page, and it is your responsibility to review the policy periodically.
  
  7. Consent:
  
  By using NutriWISE, you consent to the terms outlined in this Privacy Policy.
  
  If you have any questions or concerns about our Privacy Policy, please contact us at [nutriwise@nutriwise.website].
  You can also visit our website at [www.nutriwise.website]
    `;

  Alert.alert("Terms and Conditions", termsAndConditions);
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
          <Text style={styles.label}>Client Data:</Text>
          <Text style={styles.userDataItem}>ID: {userData.ClientID}</Text>
          <Text style={styles.userDataItem}>Name: {userData.firstName}, {userData.lastName}</Text>
          <Text style={styles.userDataItem}>Birthdate: {userData.birthdate}</Text>
          <Text style={styles.userDataItem}>Sex: {userData.sex}</Text>
          <Text style={styles.userDataItem}>Student: {userData.fullName}</Text>
        </View>
      )}
      <View style={styles.settingsContainer}>
        <Text style={styles.settingsHeading}>About NutriWISE</Text>
        <TouchableOpacity style={styles.settingItem} onPress={showAboutDevelopersAlert}>
          <Text style={styles.settingLabel}>About the Developers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={showTermsAndConditionsAlert}>
          <Text style={styles.settingLabel}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
       {/* <View style={styles.settingsContainer}>
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
        <TouchableOpacity style={styles.settingItem} onPress={() => clearClientInfo()}>
          <Text style={styles.settingLabel}>Clear Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => handleDeleteTables()}>
          <Text style={styles.settingLabel}>Delete Table</Text>
        </TouchableOpacity>
      </View> */}
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