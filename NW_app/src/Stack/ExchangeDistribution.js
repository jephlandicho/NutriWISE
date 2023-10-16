import { StyleSheet, TextInput, Text, View,ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { ResultContext } from '../Components/ResultContext';
import CustomInput from '../Components/CustomInput';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const ExchangeDistribution = () => {
  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const { vegetableEx, fruitEx, WholeMilkEx,
    LFMilkEx,
    NFMilkEx, sugarEx, riceAEx, riceBEx, riceCEx, LFmeatEx, MFmeatEx,HFmeatEx, fatEx ,setAvegetablesBreakfast ,setAvegetablesAMSnacks,setAvegetablesLunch,setAvegetablesPMSnacks,setAvegetablesDinner,setAfruitBreakfast,setAfruitAMSnacks,setAfruitLunch,setAfruitPMSnacks,setAfruitDinner,setAriceABreakfast,setAriceAAMSnacks,setAriceALunch,setAriceAPMSnacks,setAriceADinner,setAriceBBreakfast,setAriceBAMSnacks,setAriceBLunch,setAriceBPMSnacks,setAriceBDinner,setAriceCBreakfast,setAriceCAMSnacks,setAriceCLunch,setAriceCPMSnacks,setAriceCDinner,setAWholeMilkBreakfast,setAWholeMilkAMSnacks,setAWholeMilkLunch,setAWholeMilkPMSnacks,setAWholeMilkDinner,setALFMilkBreakfast,setALFMilkAMSnacks,setALFMilkLunch,setALFMilkPMSnacks,setALFMilkDinner,setANFMilkBreakfast,setANFMilkAMSnacks,setANFMilkLunch,setANFMilkPMSnacks,setANFMilkDinner,setALFBreakfast,setALFAMSnacks,setALFLunch,setALFPMSnacks,setALFDinner,setAMFBreakfast,setAMFAMSnacks,setAMFLunch,setAMFPMSnacks,setAMFDinner,setAFatBreakfast,setAFatAMSnacks,setAFatLunch,setAFatPMSnacks,setAFatDinner,setASugarBreakfast,setASugarAMSnacks,setASugarLunch,setASugarPMSnacks,setASugarDinner,setAHFBreakfast,setAHFAMSnacks,setAHFLunch,setAHFPMSnacks,setAHFDinner} = useContext(ResultContext);
    const { AvegetablesMidnightSnacks,setAvegetablesMidnightSnacks,
        AfruitMidnightSnacks,setAfruitMidnightSnacks,
        AriceAMidnightSnacks,setAriceAMidnightSnacks,
        AriceBMidnightSnacks,setAriceBMidnightSnacks,
        AriceCMidnightSnacks,setAriceCMidnightSnacks,
        AWholeMilkMidnightSnacks,setAWholeMilkMidnightSnacks,
        ALFMilkMidnightSnacks,setALFMilkMidnightSnacks,
        ANFMilkMidnightSnacks,setANFMilkMidnightSnacks,
        ALFMidnightSnacks,setALFMidnightSnacks,
        AMFMidnightSnacks,setAMFMidnightSnacks,
        AHFMidnightSnacks,setAHFMidnightSnacks,
        AFatMidnightSnacks,setAFatMidnightSnacks,
        ASugarMidnightSnacks,setASugarMidnightSnacks} =useContext(ResultContext)

  const vegetablesBreakfast = parseFloat(watch('vegetablesBreakfast') || 0);
  const vegetablesAMSnacks = parseFloat(watch('vegetablesAMSnacks') || 0);
  const vegetablesLunch = parseFloat(watch('vegetablesLunch') || 0);
  const vegetablesPMSnacks = parseFloat(watch('vegetablesPMSnacks') || 0);
  const vegetablesDinner = parseFloat(watch('vegetablesDinner') || 0);
  const vegetablesMidSnacks = parseFloat(watch('vegetablesMidSnacks') || 0);

  const fruitBreakfast = parseFloat(watch('fruitBreakfast') || 0);
  const fruitAMSnacks = parseFloat(watch('fruitAMSnacks') || 0);
  const fruitLunch = parseFloat(watch('fruitLunch') || 0);
  const fruitPMSnacks = parseFloat(watch('fruitPMSnacks') || 0);
  const fruitDinner = parseFloat(watch('fruitDinner') || 0);
  const fruitMidSnacks = parseFloat(watch('fruitMidSnacks') || 0);

  const riceABreakfast = parseFloat(watch('riceABreakfast') || 0);
  const riceAAMSnacks = parseFloat(watch('riceAAMSnacks') || 0);
  const riceALunch = parseFloat(watch('riceALunch') || 0);
  const riceAPMSnacks = parseFloat(watch('riceAPMSnacks') || 0);
  const riceADinner = parseFloat(watch('riceADinner') || 0);
  const riceAMidSnacks = parseFloat(watch('riceAMidSnacks') || 0);

  const riceBBreakfast = parseFloat(watch('riceBBreakfast') || 0);
  const riceBAMSnacks = parseFloat(watch('riceBAMSnacks') || 0);
  const riceBLunch = parseFloat(watch('riceBLunch') || 0);
  const riceBPMSnacks = parseFloat(watch('riceBPMSnacks') || 0);
  const riceBDinner = parseFloat(watch('riceBDinner') || 0);
  const riceBMidSnacks = parseFloat(watch('riceBMidSnacks') || 0);

  const riceCBreakfast = parseFloat(watch('riceCBreakfast') || 0);
  const riceCAMSnacks = parseFloat(watch('riceCAMSnacks') || 0);
  const riceCLunch = parseFloat(watch('riceCLunch') || 0);
  const riceCPMSnacks = parseFloat(watch('riceCPMSnacks') || 0);
  const riceCDinner = parseFloat(watch('riceCDinner') || 0);
  const riceCMidSnacks = parseFloat(watch('riceCMidSnacks') || 0);

  const WholeMilkBreakfast = parseFloat(watch('WholeMilkBreakfast') || 0);
  const WholeMilkAMSnacks = parseFloat(watch('WholeMilkAMSnacks') || 0);
  const WholeMilkLunch = parseFloat(watch('WholeMilkLunch') || 0);
  const WholeMilkPMSnacks = parseFloat(watch('WholeMilkPMSnacks') || 0);
  const WholeMilkDinner = parseFloat(watch('WholeMilkDinner') || 0);
  const WholeMilkMidSnacks = parseFloat(watch('WholeMilkMidSnacks') || 0);

  const LFMilkBreakfast = parseFloat(watch('LFMilkBreakfast') || 0);
  const LFMilkAMSnacks = parseFloat(watch('LFMilkAMSnacks') || 0);
  const LFMilkLunch = parseFloat(watch('LFMilkLunch') || 0);
  const LFMilkPMSnacks = parseFloat(watch('LFMilkPMSnacks') || 0);
  const LFMilkDinner = parseFloat(watch('LFMilkDinner') || 0);
  const LFMilkMidSnacks = parseFloat(watch('LFMilkMidSnacks') || 0);

  const NFMilkBreakfast = parseFloat(watch('NFMilkBreakfast') || 0);
  const NFMilkAMSnacks = parseFloat(watch('NFMilkAMSnacks') || 0);
  const NFMilkLunch = parseFloat(watch('NFMilkLunch') || 0);
  const NFMilkPMSnacks = parseFloat(watch('NFMilkPMSnacks') || 0);
  const NFMilkDinner = parseFloat(watch('NFMilkDinner') || 0);
  const NFMilkMidSnacks = parseFloat(watch('NFMilkMidSnacks') || 0);
  

  const LFBreakfast = parseFloat(watch('LFBreakfast') || 0);
  const LFAMSnacks = parseFloat(watch('LFAMSnacks') || 0);
  const LFLunch = parseFloat(watch('LFLunch') || 0);
  const LFPMSnacks = parseFloat(watch('LFPMSnacks') || 0);
  const LFDinner = parseFloat(watch('LFDinner') || 0);
  const LFMidSnacks = parseFloat(watch('LFMidSnacks') || 0);

  const MFBreakfast = parseFloat(watch('MFBreakfast') || 0);
  const MFAMSnacks = parseFloat(watch('MFAMSnacks') || 0);
  const MFLunch = parseFloat(watch('MFLunch') || 0);
  const MFPMSnacks = parseFloat(watch('MFPMSnacks') || 0);
  const MFDinner = parseFloat(watch('MFDinner') || 0);
  const MFMidSnacks = parseFloat(watch('MFMidSnacks') || 0);

  const HFBreakfast = parseFloat(watch('HFBreakfast') || 0);
  const HFAMSnacks = parseFloat(watch('HFAMSnacks') || 0);
  const HFLunch = parseFloat(watch('HFLunch') || 0);
  const HFPMSnacks = parseFloat(watch('HFPMSnacks') || 0);
  const HFDinner = parseFloat(watch('HFDinner') || 0);
  const HFMidSnacks = parseFloat(watch('HFMidSnacks') || 0);

  const FatBreakfast = parseFloat(watch('FatBreakfast') || 0);
  const FatAMSnacks = parseFloat(watch('FatAMSnacks') || 0);
  const FatLunch = parseFloat(watch('FatLunch') || 0);
  const FatPMSnacks = parseFloat(watch('FatPMSnacks') || 0);
  const FatDinner = parseFloat(watch('FatDinner') || 0);
  const FatMidSnacks = parseFloat(watch('FatMidSnacks') || 0);

  const SugarBreakfast = parseFloat(watch('SugarBreakfast') || 0);
  const SugarAMSnacks = parseFloat(watch('SugarAMSnacks') || 0);
  const SugarLunch = parseFloat(watch('SugarLunch') || 0);
  const SugarPMSnacks = parseFloat(watch('SugarPMSnacks') || 0);
  const SugarDinner = parseFloat(watch('SugarDinner') || 0);
  const SugarMidSnacks = parseFloat(watch('SugarMidSnacks') || 0);



  useEffect(() => {
    assigned()
  }, [vegetablesBreakfast, vegetablesAMSnacks, vegetablesLunch, vegetablesPMSnacks, vegetablesDinner,fruitBreakfast,fruitAMSnacks,fruitLunch,fruitPMSnacks,fruitDinner,riceABreakfast,riceAAMSnacks,riceALunch,riceAPMSnacks,riceADinner,riceBBreakfast,riceBAMSnacks,riceBLunch,riceBPMSnacks,riceBDinner,riceCBreakfast,riceCAMSnacks,riceCLunch,riceCPMSnacks,riceCDinner,
    ,LFBreakfast,LFAMSnacks,LFLunch,LFPMSnacks,LFDinner,MFBreakfast,MFAMSnacks,MFLunch,MFPMSnacks,MFDinner,FatBreakfast,FatAMSnacks,FatLunch,FatPMSnacks,FatDinner,SugarBreakfast,SugarAMSnacks,SugarLunch,SugarPMSnacks,SugarDinner,HFBreakfast,HFAMSnacks,HFLunch,HFPMSnacks,HFDinner,vegetablesMidSnacks,
    fruitMidSnacks,
    riceAMidSnacks,
    riceBMidSnacks,
    riceCMidSnacks,
    WholeMilkBreakfast,
    WholeMilkAMSnacks,
    WholeMilkLunch,
    WholeMilkPMSnacks,
    WholeMilkDinner,
    WholeMilkMidSnacks,
    LFMilkBreakfast,
    LFMilkAMSnacks,
    LFMilkLunch,
    LFMilkPMSnacks,
    LFMilkDinner,
    LFMilkMidSnacks,
    NFMilkBreakfast,
    NFMilkAMSnacks,
    NFMilkLunch,
    NFMilkPMSnacks,
    NFMilkDinner,
    NFMilkMidSnacks,
    LFMidSnacks,
    MFMidSnacks,
    HFMidSnacks,
    FatMidSnacks,
    SugarMidSnacks]);

    const assigned = () => {
        setAvegetablesBreakfast(vegetablesBreakfast)
        setAvegetablesAMSnacks(vegetablesAMSnacks)
        setAvegetablesLunch(vegetablesLunch)
        setAvegetablesPMSnacks(vegetablesPMSnacks)
        setAvegetablesDinner(vegetablesDinner)
        setAfruitBreakfast(fruitBreakfast)
        setAfruitAMSnacks(fruitAMSnacks)
        setAfruitLunch(fruitLunch)
        setAfruitPMSnacks(fruitPMSnacks)
        setAfruitDinner(fruitDinner)
        setAriceABreakfast(riceABreakfast)
        setAriceAAMSnacks(riceAAMSnacks)
        setAriceALunch(riceALunch)
        setAriceAPMSnacks(riceAPMSnacks)
        setAriceADinner(riceADinner)
        setAriceBBreakfast(riceBBreakfast)
        setAriceBAMSnacks(riceBAMSnacks)
        setAriceBLunch(riceBLunch)
        setAriceBPMSnacks(riceBPMSnacks)
        setAriceBDinner(riceBDinner)
        setAriceCBreakfast(riceCBreakfast)
        setAriceCAMSnacks(riceCAMSnacks)
        setAriceCLunch(riceCLunch)
        setAriceCPMSnacks(riceCPMSnacks)
        setAriceCDinner(riceCDinner)

        setAWholeMilkBreakfast(WholeMilkBreakfast)
        setAWholeMilkAMSnacks(WholeMilkAMSnacks)
        setAWholeMilkLunch(WholeMilkLunch)
        setAWholeMilkPMSnacks(WholeMilkPMSnacks)
        setAWholeMilkDinner(WholeMilkDinner)

        setALFMilkBreakfast(LFMilkBreakfast)
        setALFMilkAMSnacks(LFMilkAMSnacks)
        setALFMilkLunch(LFMilkLunch)
        setALFMilkPMSnacks(LFMilkPMSnacks)
        setALFMilkDinner(LFMilkDinner)

        setANFMilkBreakfast(NFMilkBreakfast)
        setANFMilkAMSnacks(NFMilkAMSnacks)
        setANFMilkLunch(NFMilkLunch)
        setANFMilkPMSnacks(NFMilkPMSnacks)
        setANFMilkDinner(NFMilkDinner)

        setALFBreakfast(LFBreakfast)
        setALFAMSnacks(LFAMSnacks)
        setALFLunch(LFLunch)
        setALFPMSnacks(LFPMSnacks)
        setALFDinner(LFDinner)

        setAMFBreakfast(MFBreakfast)
        setAMFAMSnacks(MFAMSnacks)
        setAMFLunch(MFLunch)
        setAMFPMSnacks(MFPMSnacks)
        setAMFDinner(MFDinner)

        setAHFBreakfast(HFBreakfast)
        setAHFAMSnacks(HFAMSnacks)
        setAHFLunch(HFLunch)
        setAHFPMSnacks(HFPMSnacks)
        setAHFDinner(HFDinner)

        setAFatBreakfast(FatBreakfast)
        setAFatAMSnacks(FatAMSnacks)
        setAFatLunch(FatLunch)
        setAFatPMSnacks(FatPMSnacks)
        setAFatDinner(FatDinner)
        setASugarBreakfast(SugarBreakfast)
        setASugarAMSnacks(SugarAMSnacks)
        setASugarLunch(SugarLunch)
        setASugarPMSnacks(SugarPMSnacks)
        setASugarDinner(SugarDinner)
        setAvegetablesMidnightSnacks(vegetablesMidSnacks)
        setAfruitMidnightSnacks(fruitMidSnacks)
        setAriceAMidnightSnacks(riceAMidSnacks)
        setAriceBMidnightSnacks(riceBMidSnacks)
        setAriceCMidnightSnacks(riceCMidSnacks)
        setAWholeMilkMidnightSnacks(WholeMilkMidSnacks)
        setALFMilkMidnightSnacks(LFMilkMidSnacks)
        setANFMilkMidnightSnacks(NFMilkMidSnacks)
        setALFMidnightSnacks(LFMidSnacks)
        setAMFMidnightSnacks(MFMidSnacks)
        setAHFMidnightSnacks(HFMidSnacks)
        setAFatMidnightSnacks(FatMidSnacks)
        setASugarMidnightSnacks(SugarMidSnacks)
    } 
  return (
    <View style={styles.mainCon}>
    <View style={styles.mainContainer}>
          <View style={styles.header}>
              <Text style={styles.textDesign}>Breakfast</Text>
              <Text style={styles.textDesign}>AM Snacks</Text>
              <Text style={styles.textDesign}>Lunch</Text>
              <Text style={styles.textDesign}>PM Snacks</Text>
              <Text style={styles.textDesign}>Dinner</Text>
              <Text style={styles.textDesign}>Midnight Snacks</Text>
          </View>
      <ScrollView>
        <View style={styles.container}>
        {vegetableEx !== '0' ? (
        <>
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
            <View style={styles.input}>
            <CustomInput control={control} numeric={true} name="vegetablesMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {fruitEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="fruitMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {riceAEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="riceAMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {riceBEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="riceBMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {riceCEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="riceCMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {WholeMilkEx !== '0' ? (
        <>
        <Text>Whole Milk: {WholeMilkEx}</Text><View style={styles.row}>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkBreakfast" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkAMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkLunch" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkPMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkDinner" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="WholeMilkMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {LFMilkEx !== '0' ? (
        <>
        <Text>Low-Fat Milk: {LFMilkEx}</Text><View style={styles.row}>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkBreakfast" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkAMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkLunch" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkPMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkDinner" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMilkMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {NFMilkEx !== '0' ? (
        <>
        <Text>Non-Fat Milk: {NFMilkEx}</Text><View style={styles.row}>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkBreakfast" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkAMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkLunch" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkPMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkDinner" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="NFMilkMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {LFmeatEx !== '0' ? (
        <>
        <Text>Low Fat Meat: {LFmeatEx}</Text><View style={styles.row}>
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="LFMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {MFmeatEx !== '0' ? (
        <>
        <Text>Medium Fat Meat: {MFmeatEx}</Text><View style={styles.row}>
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="MFMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {HFmeatEx !== '0' ? (
        <>
        <Text>High Fat Meat: {HFmeatEx}</Text><View style={styles.row}>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFBreakfast" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFAMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFLunch" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFPMSnacks" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFDinner" />
            </View>
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="HFMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {fatEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="FatMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        {sugarEx !== '0' ? (
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
            <View style={styles.input}>
                <CustomInput control={control} numeric={true} name="SugarMidSnacks" />
            </View>
        </View>
        </>
        ) : null}
        </View>
          </ScrollView>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
    mainCon:{
    backgroundColor: '#fff',
    flex: 1,
    },
  container: {
    flex: 1,
    marginHorizontal: windowWidth * 0.005,
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
    marginHorizontal: windowWidth * 0.005,
  },
  textDesign: {
    flex: 1,
    marginRight: 0,
    paddingVertical: 2,
    textAlign: 'center', // Align text in the center
    flexWrap: 'nowrap', // Ensure text stays in one line only
    fontSize: 14,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.02,
    },
});

export default ExchangeDistribution;
