import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';
import MyTheme from './MyTheme';
import { Ionicons } from '@expo/vector-icons';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  icon,
  numeric,
  title,
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e2e0e0' }]}>
            <Feather name={icon} size={18} color="#666666" style={styles.icon} />
            
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              label={title}
              secureTextEntry={passwordVisible}
              theme={MyTheme}
              keyboardType={numeric ? 'numeric' : 'default'}
            />
            {/* Toggle password visibility */}
            {secureTextEntry && (
              <Ionicons
              name={passwordVisible ? 'eye-off' : 'eye'}
              size={20}
              color="#333"
              style={styles.toggleIcon}
              onPress={togglePasswordVisibility}
            />
              // <Feather
              //   name={passwordVisible ? 'eye' : 'eye-off'}
              //   size={18}
              //   color="#666666"
              //   style={styles.toggleIcon}
                
              // />
            )}
          </View>
          {error && <Text style={{ color: 'red', alignSelf: 'flex-end' }}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 5,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  toggleIcon: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
  input: {
    flex: 1,
    backgroundColor: 'white'
  },
});

export default CustomInput;
