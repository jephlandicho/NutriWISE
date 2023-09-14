import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState,useContext  } from 'react';
import { Picker } from '@react-native-picker/picker';
import CustomInput from '../Components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ResultContext } from '../Components/ResultContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../Components/CustomButton';

const MealPlan = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const navigation = useNavigation();
  const { result, setResult, otherValue, setOtherValue,clientName,setClientname,clientAge,setClientAge,clientSex,setClientSex,waistC,setWaistC,hipC,setHipC,varweight,setweight,varheight,setheight,pal,setPal,whr,setwhr,bmi,setbmi,dbw,setdbw,carbs,setcarbs,protein,setprotein,fats,setfats,TER,setTER,normal,setNormal,birthdate,setbirthdate } = useContext(ResultContext);
  
  const name = watch('Client_name');
  const sex = watch('gender');
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
    setbirthdate(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
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
    const tenPercent = (heightInCm - 100);
    const desirableWeight = tenPercent -(tenPercent * .10);
    const ter = Math.round((desirableWeight * parseFloat(kcal)) / 50) * 50;
    const carbs = Math.round(((ter * 0.65) / 4) / 5) * 5;
    const protein = Math.round(((ter * 0.15) / 4) / 5) * 5;
    const fats = Math.round(((ter * 0.20) / 9) / 5) * 5;

    const resultText = `(${bmiCategory})\n\nWHR: ${whr.toFixed(2)} cm\nBMI: ${bmi.toFixed(1)} kg/m²\nDesirable Body Weight: ${desirableWeight.toFixed(2)} kg`;
    setResult(resultText);
    const dietRX = `Diet RX:\n \nCarbohydrates: ${carbs} g\nProtein: ${protein} g\nFats: ${fats} g\nTER: ${ter} kcal`;
    setOtherValue(dietRX);

    setClientname(name);
    setClientSex(sex);
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

  }

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <CustomInput
            title="Client Full Name"
            name="Client_name"
            placeholder="Client name"
            control={control}
            rules={{ required: 'Client Name is required!' }} />
            <View style={styles.pal}>
            <Text>Birthdate: ({new Date(date).toLocaleDateString('en-US')})</Text>
            <CustomButton
            onPress={showDatepicker} text={'Select Birthdate'} type='tertiary'
            />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              onChange={onChange}
            />
          )}
            </View>

          <View style={styles.pal}>
            <Text>Sex:</Text>
            <Controller
              control={control}
              name="gender"
              defaultValue="Male"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              )} />
          </View>

          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Waist Circum (cm)"
              name="waistCircumference"
              numeric={true}
              placeholder="Waist (cm)"
              rules={{ required: 'Waist Circumference is required' }} />
          </View>
          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Hip Circum (cm)"
              name="hipCircumference"
              numeric={true}
              placeholder="Hip (cm)"
              rules={{ required: 'Hip Circumference is required' }} />
          </View>
          <View style={styles.item}>
            <CustomInput
              control={control}
              title="Weight (kg)"
              name="weight"
              numeric={true}
              placeholder="Weight (kg)"
              rules={{ required: 'Weight is required' }} />
          </View>
          <View style={styles.item}>
            <CustomInput
              title="Height (m)"
              control={control}
              name="height"
              numeric={true}
              placeholder="Height (m)"
              rules={{ required: 'Height is required' }} />
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
                  <Picker.Item label="Vigorous" value="45" />
                </Picker>
              )} />
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

    </ScrollView></>
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
    paddingBottom: 60,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20,
  },
  inputContainer: {
    width: '90%',
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
    marginBottom:50
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
  btnNext: {
    marginTop: 20,
    backgroundColor: '#0000ff',
    width: '50%',
    alignSelf: 'center',
  },
});

export default MealPlan;
