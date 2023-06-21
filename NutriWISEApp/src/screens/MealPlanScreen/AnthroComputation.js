import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const MealPlan = () => {
  const [waistCircumference, setWaistCircumference] = useState('');
  const [hipCircumference, setHipCircumference] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [kcal, setKcal] = useState('');
  const [result, setResult] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();

  useEffect(() => {
    calculateResult();
  }, [waistCircumference, hipCircumference, weight, height, kcal]);

  const handleChange = (itemValue) => {
    setKcal(itemValue);
  };

  const calculateResult = () => {
    const whr = parseFloat(waistCircumference) / parseFloat(hipCircumference);
    const bmi = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
    let bmiCategory;
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiCategory = 'Normal';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      bmiCategory = 'Overweight';
    } else if (bmi >= 30.0 && bmi <= 39.9) {
      bmiCategory = 'Obese 1';
    } else {
      bmiCategory = 'Obese 2';
    }
    const heightInCm = parseFloat(height) * 100;
    const desirableWeight = (heightInCm - 100) * 0.90;
    const ter = Math.round((desirableWeight * parseFloat(kcal)) / 50) * 50;
    const protein = Math.round(((ter * 0.65) / 4) / 5) * 5;
    const carbs = Math.round(((ter * 0.15) / 4) / 5) * 5;
    const fats = Math.round(((ter * 0.20) / 9) / 5) * 5;

    const resultText = `(${bmiCategory})\n\nWHR: ${whr.toFixed(2)} cm\nBMI: ${bmi.toFixed(1)} kg/m²\nDesirable Body Weight: ${desirableWeight.toFixed(2)} kg\nTER: ${ter} kcal\nDiet RX:\nProtein: ${protein} g\nCarbohydrates: ${carbs} g\nFats: ${fats} g`;
    setResult(resultText);
  };

  const nextPressed = () => {
    navigation.navigate('ExchangeComputation');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Body Stats Calculator</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <CustomInput
            name="Client_name"
            placeholder="Client name"
            control={control}
            rules={{ required: 'Client Name is required!' }}
          />
          <CustomInput
            name="Age"
            placeholder="Age"
            control={control}
            rules={{ required: 'Age is required!' }}
          />
          <View style={styles.pal}>
            <Text>Sex:</Text>
            <Picker selectedValue={kcal} onValueChange={handleChange}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <View style={styles.item}>
            <Input
              label="Waist Circumference (cm)"
              keyboardType="numeric"
              value={waistCircumference}
              onChangeText={(value) => setWaistCircumference(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Hip Circumference (cm)"
              keyboardType="numeric"
              value={hipCircumference}
              onChangeText={(value) => setHipCircumference(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Weight (kg)"
              keyboardType="numeric"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Height (m)"
              keyboardType="numeric"
              value={height}
              onChangeText={(value) => setHeight(value)}
            />
          </View>
          <View style={styles.pal}>
            <Text>Physical Activity Level:</Text>
            <Picker selectedValue={kcal} onValueChange={handleChange}>
              <Picker.Item label="Sedentary" value="30" />
              <Picker.Item label="Light" value="35" />
              <Picker.Item label="Moderate" value="40" />
              <Picker.Item label="Very Active" value="45" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.result}>{result}</Text>
      </View>

      <View style={styles.btnNext}>
        <CustomButton
          text="Next"
          onPress={handleSubmit(nextPressed)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  btnNext: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  inputContainer: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '50%',
  },
  pal: {
    width: '100%',
  },
  resultContainer: {},
  result: {
    fontSize: 18,
    textAlign: 'center',
  }
});

export default MealPlan;
