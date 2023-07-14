import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MealPlan = () => {
  return (
    <View style={styles.container}>
      <Text>MealPlan</Text>
    </View>
  )
}

export default MealPlan
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });