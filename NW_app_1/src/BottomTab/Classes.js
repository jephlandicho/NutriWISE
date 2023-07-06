import { StyleSheet, Text, View } from 'react-native';
import React from 'react'

const Classes = () => {
  return (
    <View style={styles.container}>
      <Text>Classes</Text>
    </View>
  )
}

export default Classes
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });