import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress,text, type="primary", bgColor, fgColor}) => {
  return (
    <Pressable onPress={onPress}
    style={[styles.container,
    styles[`container_${type}`],
    bgColor ?{backgroundColor: bgColor}: {}]}>
      <Text
      style={[styles.text,
      styles[`text_${type}`],
      fgColor ? {color: fgColor}: {}]}>
        {text}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: '#9c9c9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },

  container_primary:{
    backgroundColor: '#3B71F3',
  },

  container_tertiary:{
    backgroundColor: '#ffffff',
  },

  text: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  text_tertiary:{
    color: '#aaaaaa',
  }
});

export default CustomButton;