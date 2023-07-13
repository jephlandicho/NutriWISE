import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomInput from './CustomInput';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ResultContext } from './ResultContext';

const Measurements = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const navigation = useNavigation();
  const { result, setResult, otherValue, setOtherValue, waistC, setWaistC, hipC, setHipC, setweight, setheight, setPal, whr, setwhr, bmi, setbmi, dbw, setdbw, carbs, setcarbs, protein, setprotein, fats, setfats, TER, setTER, normal, setNormal } = useContext(ResultContext);

  const waistCircumference = watch('waistCircumference');
  const hipCircumference = watch('hipCircumference');
  const weight = watch('weight');
  const height = watch('height');
  const kcal = watch('kcal');

  useEffect(() => {
    calculateResult();
  }, [waistCircumference, hipCircumference, weight, height, kcal]);

  const handleChange = (itemValue) => {
    setValue('kcal', itemValue);
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
    const tenPercent = heightInCm - 100;
    const desirableWeight = tenPercent - tenPercent * 0.1;
    const ter = Math.round((desirableWeight * parseFloat(kcal)) / 50) * 50;
    const protein = Math.round(((ter * 0.65) / 4) / 5) * 5;
    const carbs = Math.round(((ter * 0.15) / 4) / 5) * 5;
    const fats = Math.round(((ter * 0.2) / 9) / 5) * 5;

    const resultText = `(${bmiCategory})\n\nWHR: ${whr.toFixed(2)} cm\nBMI: ${bmi.toFixed(1)} kg/m²\nDesirable Body Weight: ${desirableWeight.toFixed(2)} kg`;
    setResult(resultText);
    const dietRX = `Diet RX:\n \nCarbohydrates: ${carbs} g\nProtein: ${protein} g\nFats: ${fats} g\nTER: ${ter} kcal`;
    setOtherValue(dietRX);
    setWaistC(waistCircumference);
    setHipC(hipCircumference);
    setweight(weight);
    setheight(height);
    setPal(kcal);
    setNormal(bmiCategory);
    setwhr(whr.toFixed(2));
    setbmi(bmi.toFixed(1));
    setdbw(desirableWeight.toFixed(2));
    setcarbs(carbs);
    setprotein(protein);
    setfats(fats);
    setTER(ter);
  };

  const nextPressed = () => {
    navigation.navigate('ExchangeComputation');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Waist Circumference"
              name="waistCircumference"
              numeric={true}
              placeholder="Waist Circumference (cm)"
              rules={{ required: 'Waist Circumference is required' }}
            />
          </View>
          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Hip Circumference"
              name="hipCircumference"
              numeric={true}
              placeholder="Hip Circumference (cm)"
              rules={{ required: 'Hip Circumference is required' }}
            />
          </View>
          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Weight"
              name="weight"
              numeric={true}
              placeholder="Weight (kg)"
              rules={{ required: 'Weight is required' }}
            />
          </View>
          <View style={styles.item}>
            <CustomInput
              title="Height"
              control={control}
              name="height"
              numeric={true}
              placeholder="Height (m)"
              rules={{ required: 'Height is required' }}
            />
          </View>
          <View style={styles.pal}>
            <Text>Physical Activity Level:</Text>
            <Controller
              control={control}
              name="kcal"
              defaultValue="30"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Sedentary" value="30" />
                  <Picker.Item label="Light" value="35" />
                  <Picker.Item label="Moderate" value="40" />
                  <Picker.Item label="Very Active" value="45" />
                </Picker>
              )}
            />
          </View>
        </View>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.result}>{normal}</Text>
        <Text style={styles.result}>WHR: {whr} cm</Text>
        <Text style={styles.result}>BMI: {bmi} kg/m²</Text>
        <Text style={styles.result}>DBW: {dbw} kg</Text>
        <Text style={styles.result}>Diet RX:</Text>
        <Text style={styles.result}>Carbohydrates: {carbs} g</Text>
        <Text style={styles.result}>Protein: {protein} g</Text>
        <Text style={styles.result}>Fats: {fats} g</Text>
        <Text style={styles.result}>TER: {TER} kcal</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 5,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  item: {
    width: '50%',
    paddingLeft: 10,
  },
  pal: {
    width: '100%',
    marginTop: 10,
  },
  resultContainer: {
    paddingLeft: 10,
    marginBottom: 2,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderColor: '#e2e0e0',
    borderWidth: 1,
    borderRadius: 5,
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
});

export default Measurements;
