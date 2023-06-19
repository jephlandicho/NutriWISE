import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import {Controller} from 'react-hook-form';

const CustomInput = ({control,name,rules={},placeholder, secureTextEntry,icon}) => {
  return (
      <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
        <>
        <View style={[styles.container,{borderColor: error ?'red': '#e2e0e0'}]}>
          <Feather name={icon} size={18} color="#666666" style={styles.icon} /> 
        <TextInput
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        />
        </View>
        {error && (<Text style={{color:'red',alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>)}
        </>

      )}
      />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderColor: '#e2e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 13,
    color: '#333333',
    shadowColor: '#9c9c9c',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },

    input: {
       flex: 1 
    },
  });

export default CustomInput;