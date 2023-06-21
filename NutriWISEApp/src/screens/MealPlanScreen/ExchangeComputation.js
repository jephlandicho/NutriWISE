import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';


const ExchangeComputation = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigation = useNavigation();
  const [vegetables, setVegetables] = useState('');
  const [fruit, setFruit] = useState('');
  const [milk, setMilk] = useState('');
  const [sugar, setSugar] = useState('');
  const [riceA, setRiceA] = useState('');
  const [riceB, setRiceB] = useState('');
  const [riceC, setRiceC] = useState('');
  const [LFmeat, setLFmeat] = useState('');
  const [MFmeat, setMFmeat] = useState('');
  const [fat, setFat] = useState('');

  const [protein1, setProtein1] = useState('');
  const [meat1, setMeat1] = useState('');
  const [fat1, setFat1] = useState('');  

  const [riceExResult, setRiceExResult] = useState('');
  const [meatExResult, setMeatExResult] = useState('');

  const [result1, setResult1] = useState('');
  const [showInputField, setShowInputField] = useState(false);
  const [showInputField2, setShowInputField2] = useState(false);
  const [showInputField3, setShowInputField3] = useState(false);

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
    
  }, [vegetables, fruit, milk, sugar, riceA,riceB, riceC, LFmeat, MFmeat]);

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
    const riceExchange = Math.round((245 - carbsPartial) / 23);

    const riceRes = `(${riceExchange})`;
    setRiceExResult(riceRes);

    const res1 = `Vegetables: (${vegetables}) exchange\nCarbohydrates: (${vegCarbs}) Protein: (${vegProtein}) Kcal: (${vegKcal})\n\nFruits: (${fruit}) exchange\n Carbohydrates: (${fruitCarbs}) Kcal: (${fruitKcal})\n\nMilk: (${milk}) exchange\nCarbohydrates: (${milkCarbs})Protein: (${milkProtein})Fat: (${milkFat})Kcal: (${milkKcal})\n\nSugar: (${sugar}) exchange\nSugar: (${sugarCarbs}) Kcal: (${sugarKcal})`;
    setResult1(res1);
    setShowInputField(true);
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

    const proteinPartial = protein1 + riceBProtein + riceCProtein;
    const meatExchange = Math.round((55 - proteinPartial) / 8);

    const riceMeat = `(${meatExchange})`;
    setMeatExResult(riceMeat);
    setShowInputField2(true);
  }

  const compute3 = () => {
    const lfmeatProtein = LFmeat * 8
    const lfmeatFat = LFmeat * 1
    const LFKcal = LFmeat * 41

    const mfmeatProtein = MFmeat * 8
    const mfmeatFat = MFmeat * 6
    const MFKcal = MFmeat * 86

    const fatPartial = fat1 + lfmeatFat + mfmeatFat
    const fatExchange =  Math.round((35 - fatPartial) / 5);
    setFat(fatExchange)
    setShowInputField3(true)
  }

  const nextPressed = () => {
    navigation.navigate('MealPlanning');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Exchange Computation</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.item}>
            <Input
              label="Vegetables"
              keyboardType="numeric"
              value={vegetables}
              onChangeText={(value) => setVegetables(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Fruit"
              keyboardType="numeric"
              value={fruit}
              onChangeText={(value) => setFruit(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Milk"
              keyboardType="numeric"
              value={milk}
              onChangeText={(value) => setMilk(value)}
            />
          </View>
          <View style={styles.item}>
            <Input
              label="Sugar"
              keyboardType="numeric"
              value={sugar}
              onChangeText={(value) => setSugar(value)}
            />
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
                  <Input
                    label="Rice A"
                    keyboardType="numeric"
                    value={riceA}
                    onChangeText={(value) => setRiceA(value)}
                  />
                </View>
                <View style={styles.item}>
                  <Input
                    label="Rice B"
                    keyboardType="numeric"
                    value={riceB}
                    onChangeText={(value) => setRiceB(value)}
                  />
                </View>
                <View style={styles.item}>
                  <Input
                    label="Rice C"
                    keyboardType="numeric"
                    value={riceC}
                    onChangeText={(value) => setRiceC(value)}
                  />
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
                  <Input
                    label="Low Fat Meat"
                    keyboardType="numeric"
                    value={LFmeat}
                    onChangeText={(value) => setLFmeat(value)}
                  />
                </View>
                <View style={styles.item}>
                  <Input
                    label="Medium Fat Meat"
                    keyboardType="numeric"
                    value={MFmeat}
                    onChangeText={(value) => setMFmeat(value)}
                  />
                </View>
              </View>
            )}
          </View>
        )}

        {fat !== '' && (
          <View>
            <Text style={styles.result}>{result1}</Text>
            {showInputField3 && (
          <View style={styles.btnNext}>
            <CustomButton
              text="Next"
              onPress={handleSubmit(nextPressed)}
            />
          </View>
            )}
          </View>
        )}
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
    paddingBottom: 60,
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
  },
  item: {
    width: '50%',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ExchangeComputation;
