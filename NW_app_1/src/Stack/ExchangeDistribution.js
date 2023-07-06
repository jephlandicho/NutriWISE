import { StyleSheet, TextInput, Text, View,ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { ResultContext } from '../Components/ResultContext';
import CustomInput from '../Components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '../Components/CustomButton';

const ExchangeDistribution = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { vegetableEx, fruitEx, milkEx, sugarEx, riceAEx, riceBEx, riceCEx, LFmeatEx, MFmeatEx, fatEx } = useContext(ResultContext);

  const [vegetableTotal, setVegetableTotal] = useState(0);
  const [displayFruitRow, setDisplayFruitRow] = useState(false);

  const [fruitTotal, setFruitTotal] = useState(0);
  const [displayRiceARow, setdisplayRiceARow] = useState(false);

  const [riceATotal, setriceATotal] = useState(0);
  const [displayRiceBRow, setdisplayRiceBRow] = useState(false);

  const [riceBTotal, setriceBTotal] = useState(0);
  const [displayRiceCRow, setdisplayRiceCRow] = useState(false);

  const [riceCTotal, setriceCTotal] = useState(0);
  const [displayMilkRow, setdisplayMilkRow] = useState(false);

  const [milkTotal, setMilkTotal] = useState(0);
  const [displayLFRow, setdisplayLFRow] = useState(false);

  const [LFTotal, setLFTotal] = useState(0);
  const [displayMFRow, setdisplayMFRow] = useState(false);

  const [MFTotal, setMFTotal] = useState(0);
  const [displayFatRow, setdisplayFatRow] = useState(false);

  const [fatTotal, setFatTotal] = useState(0);
  const [displaySugarRow, setSugarRow] = useState(false);

  const [sugarTotal, setSugarTotal] = useState(0);
  const [displayLastRow, setLastRow] = useState(false);

  const vegetablesBreakfast = parseFloat(watch('vegetablesBreakfast') || 0);
  const vegetablesAMSnacks = parseFloat(watch('vegetablesAMSnacks') || 0);
  const vegetablesLunch = parseFloat(watch('vegetablesLunch') || 0);
  const vegetablesPMSnacks = parseFloat(watch('vegetablesPMSnacks') || 0);
  const vegetablesDinner = parseFloat(watch('vegetablesDinner') || 0);

  const fruitBreakfast = parseFloat(watch('fruitBreakfast') || 0);
  const fruitAMSnacks = parseFloat(watch('fruitAMSnacks') || 0);
  const fruitLunch = parseFloat(watch('fruitLunch') || 0);
  const fruitPMSnacks = parseFloat(watch('fruitPMSnacks') || 0);
  const fruitDinner = parseFloat(watch('fruitDinner') || 0);

  const riceABreakfast = parseFloat(watch('riceABreakfast') || 0);
  const riceAAMSnacks = parseFloat(watch('riceAAMSnacks') || 0);
  const riceALunch = parseFloat(watch('riceALunch') || 0);
  const riceAPMSnacks = parseFloat(watch('riceAPMSnacks') || 0);
  const riceADinner = parseFloat(watch('riceADinner') || 0);

  const riceBBreakfast = parseFloat(watch('riceBBreakfast') || 0);
  const riceBAMSnacks = parseFloat(watch('riceBAMSnacks') || 0);
  const riceBLunch = parseFloat(watch('riceBLunch') || 0);
  const riceBPMSnacks = parseFloat(watch('riceBPMSnacks') || 0);
  const riceBDinner = parseFloat(watch('riceBDinner') || 0);

  const riceCBreakfast = parseFloat(watch('riceCBreakfast') || 0);
  const riceCAMSnacks = parseFloat(watch('riceCAMSnacks') || 0);
  const riceCLunch = parseFloat(watch('riceCLunch') || 0);
  const riceCPMSnacks = parseFloat(watch('riceCPMSnacks') || 0);
  const riceCDinner = parseFloat(watch('riceCDinner') || 0);

  const MilkBreakfast = parseFloat(watch('MilkBreakfast') || 0);
  const MilkAMSnacks = parseFloat(watch('MilkAMSnacks') || 0);
  const MilkLunch = parseFloat(watch('MilkLunch') || 0);
  const MilkPMSnacks = parseFloat(watch('MilkPMSnacks') || 0);
  const MilkDinner = parseFloat(watch('MilkDinner') || 0);

  const LFBreakfast = parseFloat(watch('LFBreakfast') || 0);
  const LFAMSnacks = parseFloat(watch('LFAMSnacks') || 0);
  const LFLunch = parseFloat(watch('LFLunch') || 0);
  const LFPMSnacks = parseFloat(watch('LFPMSnacks') || 0);
  const LFDinner = parseFloat(watch('LFDinner') || 0);

  const MFBreakfast = parseFloat(watch('MFBreakfast') || 0);
  const MFAMSnacks = parseFloat(watch('MFAMSnacks') || 0);
  const MFLunch = parseFloat(watch('MFLunch') || 0);
  const MFPMSnacks = parseFloat(watch('MFPMSnacks') || 0);
  const MFDinner = parseFloat(watch('MFDinner') || 0);

  const FatBreakfast = parseFloat(watch('FatBreakfast') || 0);
  const FatAMSnacks = parseFloat(watch('FatAMSnacks') || 0);
  const FatLunch = parseFloat(watch('FatLunch') || 0);
  const FatPMSnacks = parseFloat(watch('FatPMSnacks') || 0);
  const FatDinner = parseFloat(watch('FatDinner') || 0);

  const SugarBreakfast = parseFloat(watch('SugarBreakfast') || 0);
  const SugarAMSnacks = parseFloat(watch('SugarAMSnacks') || 0);
  const SugarLunch = parseFloat(watch('SugarLunch') || 0);
  const SugarPMSnacks = parseFloat(watch('SugarPMSnacks') || 0);
  const SugarDinner = parseFloat(watch('SugarDinner') || 0);



  useEffect(() => {
    const totalVegetables = vegetablesBreakfast + vegetablesAMSnacks + vegetablesLunch + vegetablesPMSnacks + vegetablesDinner;
    setVegetableTotal(totalVegetables);

    const totalFruit = fruitBreakfast + fruitAMSnacks + fruitLunch + fruitPMSnacks + fruitDinner;
    setFruitTotal(totalFruit);

    const totalRiceA = riceABreakfast + riceAAMSnacks + riceALunch + riceAPMSnacks + riceADinner;
    setriceATotal(totalRiceA);

    const totalRiceB = riceBBreakfast + riceBAMSnacks + riceBLunch + riceBPMSnacks + riceBDinner;
    setriceBTotal(totalRiceB);

    const totalRiceC = riceCBreakfast + riceCAMSnacks + riceCLunch + riceCPMSnacks + riceCDinner;
    setriceCTotal(totalRiceC);

    const totalMilk = MilkBreakfast + MilkAMSnacks + MilkLunch + MilkPMSnacks + MilkDinner;
    setMilkTotal(totalMilk);

    const totalLF = LFBreakfast + LFAMSnacks + LFLunch + LFPMSnacks + LFDinner;
    setLFTotal(totalLF);

    const totalMF = MFBreakfast + MFAMSnacks + MFLunch + MFPMSnacks + MFDinner;
    setMFTotal(totalMF);

    const totalFat = FatBreakfast + FatAMSnacks + FatLunch + FatPMSnacks + FatDinner;
    setFatTotal(totalFat);

    const totalSugar = SugarBreakfast + SugarAMSnacks + SugarLunch + SugarPMSnacks + SugarDinner;
    setSugarTotal(totalSugar);

    if (totalVegetables === parseFloat(vegetableEx)) {
      setDisplayFruitRow(true);
    } else {
      setDisplayFruitRow(false);
    }
    if (totalFruit === parseFloat(fruitEx)) {
        setdisplayRiceARow(true);
      } else {
        setdisplayRiceARow(false);
      }

      if (totalRiceA === parseFloat(riceAEx)) {
        setdisplayRiceBRow(true);
      } else {
        setdisplayRiceBRow(false);
      }

      if (totalRiceB === parseFloat(riceBEx)) {
        setdisplayRiceCRow(true);
      } else {
        setdisplayRiceCRow(false);
      }

      if (totalRiceC === parseFloat(riceCEx)) {
        setdisplayMilkRow(true);
      } else {
        setdisplayMilkRow(false);
      }

      if (totalMilk === parseFloat(milkEx)) {
        setdisplayLFRow(true);
      } else {
        setdisplayLFRow(false);
      }

      if (totalLF === parseFloat(LFmeatEx)) {
        setdisplayMFRow(true);
      } else {
        setdisplayMFRow(false);
      }

      if (totalMF === parseFloat(MFmeatEx)) {
        setdisplayFatRow(true);
      } else {
        setdisplayFatRow(false);
      }

      if (totalFat === parseFloat(fatEx)) {
        setSugarRow(true);
      } else {
        setSugarRow(false);
      }

      if (totalSugar === parseFloat(sugarEx)) {
        setLastRow(true);
      } else {
        setLastRow(false);
      }
  }, [vegetableEx, vegetablesBreakfast, vegetablesAMSnacks, vegetablesLunch, vegetablesPMSnacks, vegetablesDinner,fruitBreakfast,fruitAMSnacks,fruitLunch,fruitPMSnacks,fruitDinner,riceABreakfast,riceAAMSnacks,riceALunch,riceAPMSnacks,riceADinner,riceBBreakfast,riceBAMSnacks,riceBLunch,riceBPMSnacks,riceBDinner,riceCBreakfast,riceCAMSnacks,riceCLunch,riceCPMSnacks,riceCDinner,MilkBreakfast,MilkAMSnacks,MilkLunch,MilkPMSnacks,
    MilkDinner,LFBreakfast,LFAMSnacks,LFLunch,LFPMSnacks,LFDinner,MFBreakfast,MFAMSnacks,MFLunch,MFPMSnacks,MFDinner,FatBreakfast,FatAMSnacks,FatLunch,FatPMSnacks,FatDinner,SugarBreakfast,SugarAMSnacks,SugarLunch,SugarPMSnacks,SugarDinner]);

  return (
    <>
          <View style={styles.header}>
              <Text style={styles.textDesign}>Breakfast</Text>
              <Text style={styles.textDesign}>AM Snacks</Text>
              <Text style={styles.textDesign}>Lunch</Text>
              <Text style={styles.textDesign}>PM Snacks</Text>
              <Text style={styles.textDesign}>Dinner</Text>
          </View>
      <ScrollView>
        <View style={styles.container}>

            {/* Row 2 */}

            <Text>Vegetables: {vegetableEx}</Text>
            <View style={styles.row}>
                <View style={styles.input}>
                    <CustomInput control={control} numeric={true} name="vegetablesBreakfast" />
                </View>
                <View style={styles.input}>
                    <CustomInput control={control} numeric={true} name="vegetablesAMSnacks" />
                </View>
                <View style={styles.input}>
                    <CustomInput control={control} numeric={true} name="vegetablesLunch" />
                </View>
                <View style={styles.input}>
                    <CustomInput control={control} numeric={true} name="vegetablesPMSnacks" />
                </View>
                <View style={styles.input}>
                    <CustomInput control={control} numeric={true} name="vegetablesDinner" />
                </View>
            </View>

            {/* Fruit Row */}
            {displayFruitRow && (
                <>
                    <Text>Fruit: {fruitEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="fruitBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="fruitAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="fruitLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="fruitPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="fruitDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* Rice A Row */}
            {displayRiceARow && (
                <>
                    <Text>Rice A: {riceAEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceABreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceAAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceALunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceAPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceADinner" />
                        </View>
                    </View>
                </>
            )}
            {/* Rice B Row */}
            {displayRiceBRow && (
                <>
                    <Text>Rice B: {riceBEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceBBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceBAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceBLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceBPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceBDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* Rice C Row */}
            {displayRiceCRow && (
                <>
                    <Text>Rice C: {riceCEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceCBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceCAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceCLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceCPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="riceCDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* Milk Row */}
            {displayMilkRow && (
                <>
                    <Text>Milk: {milkEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MilkBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MilkAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MilkLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MilkPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MilkDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* Meat LF Row */}
            {displayLFRow && (
                <>
                    <Text>LF Meat: {LFmeatEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="LFBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="LFAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="LFLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="LFPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="LFDinner" />
                        </View>
                    </View>
                </>
            )}

                {/* Meat MF Row */}
                {displayMFRow && (
                <>
                    <Text>MF Meat: {MFmeatEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MFBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MFAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MFLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MFPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="MFDinner" />
                        </View>
                    </View>
                </>
            )}

                {/* Fat Row */}
            {displayFatRow && (
                <>
                    <Text>Fat: {fatEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="FatBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="FatAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="FatLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="FatPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="FatDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* sugar Row */}
            {displaySugarRow && (
                <>
                    <Text>Sugar: {sugarEx}</Text><View style={styles.row}>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="SugarBreakfast" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="SugarAMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="SugarLunch" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="SugarPMSnacks" />
                        </View>
                        <View style={styles.input}>
                            <CustomInput control={control} numeric={true} name="SugarDinner" />
                        </View>
                    </View>
                </>
            )}

            {/* Last Row */}
            {displayLastRow && (
                <>
                
                </>
            )}
        </View>
          </ScrollView>
          </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginBottom:100,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 5,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  textDesign: {
    flex: 1,
    marginRight: 0,
    paddingVertical: 2,
    textAlign: 'center', // Align text in the center
    flexWrap: 'nowrap', // Ensure text stays in one line only
    fontSize: 14,
  },
});

export default ExchangeDistribution;
