import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';

import Navigation from './src/navigation';


const App = () => {

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
