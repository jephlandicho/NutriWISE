import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import {SafeAreaView, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

const Materials = () => {
    const route = useRoute();
  const { material } = route.params;
    return (
        <>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
          <SafeAreaView style={{flex: 1}}>
            <WebView source={{uri: `https://nutriwise.website/Prof/${material}`}} />
          </SafeAreaView>
          </View>
          
        </>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    }
  });
export default Materials