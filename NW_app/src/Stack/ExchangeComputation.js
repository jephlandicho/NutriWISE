import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ResultContext } from '../Components/ResultContext';
import CustomInput from '../Components/CustomInput';


const ExchangeComputation = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const navigation = useNavigation();
  // total of the 3 food groups per computation
  // compute1
  const [carbs1,setCarbs1] = useState('');
  const [protein1, setProtein1] = useState('');
  const [fat1, setFat1] = useState('');
  const [kcal1, setKcal1] = useState('');
  //compute2
  const [carbs2,setCarbs2] = useState('');
  const [protein2, setProtein2] = useState('');
  const [kcal2, setKcal2] = useState('');
  //compute3
  const [protein3, setProtein3] = useState('');
  const [fat2, setfat2] = useState('');
  const [kcal3, setKcal3] = useState('');


  const [riceExResult, setRiceExResult] = useState('');
  const [meatExResult, setMeatExResult] = useState('');

  const [showInputField, setShowInputField] = useState(false);
  const [showInputField2, setShowInputField2] = useState(false);
  const [showInputField3, setShowInputField3] = useState(false);

  const vegetables = watch('vegetables');
  const fruit = watch('fruit');
  const milk = watch('milk');
  const sugar = watch('sugar');
  const riceA = watch('riceA');
  const riceB = watch('riceB');
  const riceC = watch('riceC');
  const LFmeat = watch('LFmeat');
  const MFmeat = watch('MFmeat');


  const { result, otherValue } = useContext(ResultContext);
  const { vegetableEx,setVegEx ,fruitEx, setfruitEx,milkEx, setmilkEx,sugarEx, setsugarEx,riceAEx,setriceAEx,riceBEx,setriceBEx,riceCEx,setriceCEx,LFmeatEx,setLFmeatEx,MFmeatEx,setMFmeatEx,fatEx,setfatEx,totalCarbs,settotalCarbs,totalProtein,settotalProtein,totalFat,settotalFat,totalKcal,settotalKcal, setOtherValue,clientName,setClientname,clientAge,setClientAge,clientSex,setClientSex,waistC,setWaistC,hipC,setHipC,varweight,setweight,varheight,setheight,pal,setPal,whr,setwhr,bmi,setbmi,dbw,setdbw,carbs,setcarbs,protein,setprotein,fats,setfats,TER,setTER,normal,setNormal } = useContext(ResultContext);



  useEffect(() => {
    if (vegetables && fruit && milk && sugar) {
      computePressed();
    }
    if (riceA && riceB && riceC)
    {
      compute2();
    }
    if (LFmeat && MFmeat)
    {
      compute3();
    }
    if (kcal3)
    {
      totalCompute();
    }
    
  }, [vegetables, fruit, milk, sugar, riceA,riceB, riceC, LFmeat, MFmeat,fatEx,kcal3]);

  const computePressed = () => {
    const vegCarbs = vegetables * 3;
    const vegProtein = vegetables * 1;
    const vegKcal = vegetables * 16;

    const fruitCarbs = fruit * 10;
    const fruitKcal = fruit * 40;

    const milkCarbs = milk * 12;
    const milkProtein = milk * 8;
    const milkFat = milk * 10;
    const milkKcal = milk * 170;

    const sugarCarbs = sugar * 5;
    const sugarKcal = sugar * 20;

    const proteinSum = vegProtein + milkProtein

    setProtein1(proteinSum)
    setFat1(milkFat)

    const carbsPartial = vegCarbs + fruitCarbs + milkCarbs + sugarCarbs;
    setCarbs1(carbsPartial)
    const riceExchange = Math.round((245 - carbsPartial) / 23);

    const riceRes = `(${riceExchange})`;
    setRiceExResult(riceRes);
    setShowInputField(true);

    setVegEx(vegetables)
    setfruitEx(fruit)
    setmilkEx(milk)
    setsugarEx(sugar)

    const kcal1 = vegKcal + fruitKcal + milkKcal + sugarKcal
    setKcal1(kcal1)
  };

  const compute2 = () => {
    const riceACarbs = riceA * 23
    const riceAKcal = riceA * 92

    const riceBCarbs = riceB * 23
    const riceBProtein = riceB * 2
    const riceBKcal = riceB * 100

    const riceCCarbs = riceC * 23
    const riceCProtein = riceC * 4
    const riceCKcal = riceC * 108

    const carbsPartial2 = riceACarbs + riceBCarbs + riceCCarbs
    setCarbs2(carbsPartial2)

    const proteinPartial = protein1 + riceBProtein + riceCProtein;
    setProtein2(riceBProtein + riceCProtein)
    const meatExchange = Math.round((55 - proteinPartial) / 8);

    const riceMeat = `(${meatExchange})`;
    setMeatExResult(riceMeat);
    setShowInputField2(true);

    setriceAEx(riceA)
    setriceBEx(riceB);
    setriceCEx(riceC);

    const kcal2 = riceAKcal + riceBKcal + riceCKcal
    setKcal2(kcal2);
  }

  const compute3 = () => {
    const lfmeatProtein = LFmeat * 8
    const lfmeatFat = LFmeat * 1
    const LFKcal = LFmeat * 41

    const mfmeatProtein = MFmeat * 8
    const mfmeatFat = MFmeat * 6
    const MFKcal = MFmeat * 86

    const proteinPartial2 = lfmeatProtein + mfmeatProtein
    setProtein3(proteinPartial2)

    const fatPartial = fat1 + lfmeatFat + mfmeatFat
    const fatExchange =  Math.round((35 - fatPartial) / 5);
    setShowInputField3(true)

    setLFmeatEx(LFmeat)
    setMFmeatEx(MFmeat)
    setfatEx(fatExchange)

    const fatFat = fatEx * 5
    const fatSum = lfmeatFat + mfmeatFat + fatFat
    setfat2(fatSum)
    const fatKcal = fatEx * 45

    const sumkcal3 = LFKcal + MFKcal + fatKcal
    setKcal3(sumkcal3)
  }

  const totalCompute = () =>{
    const t_carbs =carbs1 + carbs2
    settotalCarbs(t_carbs)
    const t_protein = protein1 + protein2 + protein3
    settotalProtein(t_protein)
    const t_fat = fat1 + fat2
    settotalFat(t_fat)

    const t_kcal = kcal1 + kcal2 + kcal3
    settotalKcal(t_kcal)
  }

  return (
    <View style={styles.mainCon}>
<View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 10 }}>
  <View style={{ flex: 1 }}>
        <Text style={styles.result1}>Carbohydrates: {carbs} g</Text>
        <Text style={styles.result1}>Protein: {protein} g</Text>
        <Text style={styles.result1}>Fats: {fats} g</Text>
        <Text style={styles.result1}>TER: {TER} kcal</Text>
  </View>
  {kcal3 !== '' && showInputField3 && (
    <View style={{ flex: 1 }}>
      <Text>Carbohydrates: {totalCarbs}</Text>
      <Text>Protein: {totalProtein}</Text>
      <Text>Fats: {totalFat}</Text>
      <Text>TER: {totalKcal}</Text>
    </View>
  )}
</View>

    
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.container}>
        
        <View style={styles.inputContainer}>
          <View style={styles.item}>
          <CustomInput
            title="Vegetables"
            name="vegetables"
            placeholder="Vegetables"
            control={control}
            numeric={true}
            rules={{ required: 'Vegetables is required!' }} />
          </View>
          <View style={styles.item}>
          <CustomInput
            title="Fruit"
            name="fruit"
            placeholder="Fruit"
            numeric={true}
            control={control}
            rules={{ required: 'Fruit is required!' }} />
          </View>
          <View style={styles.item}>
          <CustomInput
            title="Milk"
            name="milk"
            placeholder="Milk"
            numeric={true}
            control={control}
            rules={{ required: 'Milk is required!' }} />
          </View>
          <View style={styles.item}>
          <CustomInput
            title="Sugar"
            name="sugar"
            placeholder="Sugar"
            numeric={true}
            control={control}
            rules={{ required: 'Sugar is required!' }} />
          </View>
        </View>
      </View>
      <View style={styles.resultContainer}>
        {riceExResult !== '' && (
          <View>
            <Text style={styles.result}>Rice Exchange: {riceExResult}</Text>
            {showInputField && (
              <View style={styles.inputContainer2}>
                <View style={styles.item}>
                <CustomInput
                  title="Rice A"
                  name="riceA"
                  placeholder="Rice A"
                  numeric={true}
                  control={control}
                  rules={{ required: 'Rice A is required!' }} />
                </View>
                <View style={styles.item}>
                <CustomInput
                  title="Rice B"
                  name="riceB"
                  placeholder="Rice B"
                  numeric={true}
                  control={control}
                  rules={{ required: 'Rice B is required!' }} />
                </View>
                <View style={styles.item}>
                <CustomInput
                  title="Rice C"
                  name="riceC"
                  placeholder="Rice C"
                  numeric={true}
                  control={control}
                  rules={{ required: 'Rice C is required!' }} />
                </View>
              </View>
            )}
          </View>
        )}

        {meatExResult !== '' && (
          <View>
            <Text style={styles.result}>Meat Exchange: {meatExResult}</Text>
            {showInputField2 && (
              <View style={styles.inputContainer2}>
                <View style={styles.item}>
                <CustomInput
                  title="Low Fat Meat"
                  name="LFmeat"
                  placeholder="Low Fat Meat"
                  numeric={true}
                  control={control}
                  rules={{ required: 'Low Fat Meat is required!' }} />
                </View>
                <View style={styles.item}>
                <CustomInput
                  title="Medium Fat Meat"
                  name="MFmeat"
                  placeholder="Medium Fat Meat"
                  numeric={true}
                  control={control}
                  rules={{ required: 'Medium Fat Meat is required!' }} />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon:{
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    padding: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 50,
  },
  inputContainer: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  inputContainer2: {
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 100,
  },
  item: {
    width: '50%',
    paddingLeft: 10,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
  },
  result1: {
    fontSize: 14,
    textAlign: 'left',
  },
});

export default ExchangeComputation;
