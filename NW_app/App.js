import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from './src/Auth/SignInScreen';
import Navigation from './src/Navigation/Navigation';
import SyncComponent from './src/Components/SyncComponent';

export const ResultContext = React.createContext();

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  React.useEffect(() => {
    const checkUserLoginStatus = async () => {
      try {
        const userAccountString = await AsyncStorage.getItem('userAccountsss');
        if (userAccountString) {
          const userAccount = JSON.parse(userAccountString);
          // Perform any additional checks or validations if needed

          setLoggedIn(true);
        }
      } catch (error) {
        // Handle error while retrieving data
        console.log('Error retrieving user account:', error);
      }
    };

    checkUserLoginStatus();
  }, []);

  return (
    <ResultContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {/* <SyncComponent/> */}
      <View style={styles.container}>
        {isLoggedIn ? (
          <Navigation isLoggedIn={isLoggedIn} />
        ) : (
          <SignInScreen setLoggedIn={setLoggedIn} />
        )}
      </View>
    </ResultContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
