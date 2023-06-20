import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';

import Navigation from './src/navigation';

const db = SQLite.openDatabase('nw.db');

const App = () => {
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT 1 FROM sqlite_master WHERE type="table" AND name="meals"',
        [],
        () => {
          Alert.alert('Success', 'SQLite database connected successfully!');
        },
        (txObj, error) => {
          console.log('Database error:', error);
          Alert.alert('Error', 'Failed to connect to SQLite database: ' + error.message);
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Navigation />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
  container: {
    flex: 1,
  },
});

export default App;
