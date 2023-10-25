import React, { createContext, useState } from 'react';

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [otherValue, setOtherValue] = useState('');
  const [clientName,setClientname] = useState('');
  const [ClientLastName,setClientLastName] = useState('');
  const [ClientfirstName,setClientfirstName] = useState('');
  const [Clientdesignation,setClientdesignation] = useState('');
  const [Clientremarks,setClientremarks] = useState('');
  const [clientAge,setClientAge] = useState('');
  const [birthdate,setbirthdate] = useState('');
  const [clientSex,setClientSex] = useState('');
  const [waistC,setWaistC] = useState('');
  const [hipC,setHipC] = useState('');
  const [varweight,setweight] = useState('');
  const [varheight,setheight] = useState('');
  const [result, setResult] = useState('');
  const [pal,setPal] = useState('');
  const [whr,setwhr] = useState('');
  const [bmi,setbmi] = useState('');
  const [dbw,setdbw] = useState('');
  const [carbs,setcarbs] = useState('');
  const [protein,setprotein] = useState('');
  const [fats,setfats] = useState('');
  const [TER,setTER] = useState('');
  const [vegetableEx,setVegEx] = useState('');
  const [fruitEx, setfruitEx] = useState('');

  const [milkEx, setmilkEx] = useState('');

  const [WholeMilkEx, setWholeMilkEx] = useState('');
  const [LFMilkEx, setLFMilkEx] = useState('');
  const [NFMilkEx, setNFMilkEx] = useState('');
  const [sugarEx, setsugarEx] = useState('');
  const [riceAEx,setriceAEx] = useState('');
  const [riceBEx,setriceBEx] = useState('');
  const [riceCEx,setriceCEx] = useState('');
  const [LFmeatEx,setLFmeatEx] = useState('');
  const [MFmeatEx,setMFmeatEx] = useState('');
  const [HFmeatEx,setHFmeatEx] = useState('');
  const [fatEx,setfatEx] = useState('');
  const [totalCarbs,settotalCarbs] = useState('');
  const [totalProtein,settotalProtein] = useState('');
  const [totalFat,settotalFat] = useState('');
  const [totalKcal,settotalKcal] = useState('');
  const [normal,setNormal] = useState('');
  const [milkChoice, setMilkChoice] = useState('');

  const [breakfast, setBreakfast] = useState({});
  const [AMSnack, setAMSnack] = useState({});
  const [lunch, setLunch] = useState({});
  const [PMSnack, setPMSnack] = useState({});
  const [Dinner, setDinner] = useState({});
  const [MidnightSnacks, setMidnightSnacks] = useState({});

  const [menuBreakfast, setmenuBreakfast] = useState('');
  const [menuAmSnacks, setmenuAmSnacks] = useState('');
  const [menuLunch, setmenuLunch] = useState('');
  const [menuPmSnacks, setmenuPmSnacks] = useState('');
  const [menuDinner, setmenuDinner] = useState('');
  const [menuMidnightSnacks, setmenuMidnightSnacks] = useState('');

  const [householdMeasureBreakfast, setHouseholdMeasureBreakfast] = useState('');
  const [householdMeasureAmSnacks, setHouseholdMeasureAmSnacks] = useState('');
  const [householdMeasureLunch, setHouseholdMeasureLunch] = useState('');
  const [householdMeasurePmSnacks, setHouseholdMeasurePmSnacks] = useState('');
  const [householdMeasureDinner, setHouseholdMeasureDinner] = useState('');
  const [householdMeasureMidnightSnacks, setHouseholdMeasureMidnightSnacks] = useState('');
  

  const [AvegetablesBreakfast,setAvegetablesBreakfast] = useState('');
  const [AvegetablesAMSnacks,setAvegetablesAMSnacks] = useState('');
  const [AvegetablesLunch,setAvegetablesLunch] = useState('');
  const [AvegetablesPMSnacks,setAvegetablesPMSnacks] = useState('');
  const [AvegetablesDinner,setAvegetablesDinner] = useState('');
  const [AvegetablesMidnightSnacks,setAvegetablesMidnightSnacks] = useState('');

  const [AfruitBreakfast,setAfruitBreakfast] = useState('');
  const [AfruitAMSnacks,setAfruitAMSnacks] = useState('');
  const [AfruitLunch,setAfruitLunch] = useState('');
  const [AfruitPMSnacks,setAfruitPMSnacks] = useState('');
  const [AfruitDinner,setAfruitDinner] = useState('');
  const [AfruitMidnightSnacks,setAfruitMidnightSnacks] = useState('');

  const [AriceABreakfast,setAriceABreakfast] = useState('');
  const [AriceAAMSnacks,setAriceAAMSnacks] = useState('');
  const [AriceALunch,setAriceALunch] = useState('');
  const [AriceAPMSnacks,setAriceAPMSnacks] = useState('');
  const [AriceADinner,setAriceADinner] = useState('');
  const [AriceAMidnightSnacks,setAriceAMidnightSnacks] = useState('');

  const [AriceBBreakfast,setAriceBBreakfast] = useState('');
  const [AriceBAMSnacks,setAriceBAMSnacks] = useState('');
  const [AriceBLunch,setAriceBLunch] = useState('');
  const [AriceBPMSnacks,setAriceBPMSnacks] = useState('');
  const [AriceBDinner,setAriceBDinner] = useState('');
  const [AriceBMidnightSnacks,setAriceBMidnightSnacks] = useState('');

  const [AriceCBreakfast,setAriceCBreakfast] = useState('');
  const [AriceCAMSnacks,setAriceCAMSnacks] = useState('');
  const [AriceCLunch,setAriceCLunch] = useState('');
  const [AriceCPMSnacks,setAriceCPMSnacks] = useState('');
  const [AriceCDinner,setAriceCDinner] = useState('');
  const [AriceCMidnightSnacks,setAriceCMidnightSnacks] = useState('');

  const [AWholeMilkBreakfast,setAWholeMilkBreakfast] = useState('');
  const [AWholeMilkAMSnacks,setAWholeMilkAMSnacks] = useState('');
  const [AWholeMilkLunch,setAWholeMilkLunch] = useState('');
  const [AWholeMilkPMSnacks,setAWholeMilkPMSnacks] = useState('');
  const [AWholeMilkDinner,setAWholeMilkDinner] = useState('');
  const [AWholeMilkMidnightSnacks,setAWholeMilkMidnightSnacks] = useState('');

  const [ALFMilkBreakfast,setALFMilkBreakfast] = useState('');
  const [ALFMilkAMSnacks,setALFMilkAMSnacks] = useState('');
  const [ALFMilkLunch,setALFMilkLunch] = useState('');
  const [ALFMilkPMSnacks,setALFMilkPMSnacks] = useState('');
  const [ALFMilkDinner,setALFMilkDinner] = useState('');
  const [ALFMilkMidnightSnacks,setALFMilkMidnightSnacks] = useState('');

  const [ANFMilkBreakfast,setANFMilkBreakfast] = useState('');
  const [ANFMilkAMSnacks,setANFMilkAMSnacks] = useState('');
  const [ANFMilkLunch,setANFMilkLunch] = useState('');
  const [ANFMilkPMSnacks,setANFMilkPMSnacks] = useState('');
  const [ANFMilkDinner,setANFMilkDinner] = useState('');
  const [ANFMilkMidnightSnacks,setANFMilkMidnightSnacks] = useState('');

  const [ALFBreakfast,setALFBreakfast] = useState('');
  const [ALFAMSnacks,setALFAMSnacks] = useState('');
  const [ALFLunch,setALFLunch] = useState('');
  const [ALFPMSnacks,setALFPMSnacks] = useState('');
  const [ALFDinner,setALFDinner] = useState('');
  const [ALFMidnightSnacks,setALFMidnightSnacks] = useState('');

  const [AMFBreakfast,setAMFBreakfast] = useState('');
  const [AMFAMSnacks,setAMFAMSnacks] = useState('');
  const [AMFLunch,setAMFLunch] = useState('');
  const [AMFPMSnacks,setAMFPMSnacks] = useState('');
  const [AMFDinner,setAMFDinner] = useState('');
  const [AMFMidnightSnacks,setAMFMidnightSnacks] = useState('');

  const [AHFBreakfast,setAHFBreakfast] = useState('');
  const [AHFAMSnacks,setAHFAMSnacks] = useState('');
  const [AHFLunch,setAHFLunch] = useState('');
  const [AHFPMSnacks,setAHFPMSnacks] = useState('');
  const [AHFDinner,setAHFDinner] = useState('');
  const [AHFMidnightSnacks,setAHFMidnightSnacks] = useState('');

  const [AFatBreakfast,setAFatBreakfast] = useState('');
  const [AFatAMSnacks,setAFatAMSnacks] = useState('');
  const [AFatLunch,setAFatLunch] = useState('');
  const [AFatPMSnacks,setAFatPMSnacks] = useState('');
  const [AFatDinner,setAFatDinner] = useState('');
  const [AFatMidnightSnacks,setAFatMidnightSnacks] = useState('');

  const [ASugarBreakfast,setASugarBreakfast] = useState('');
  const [ASugarAMSnacks,setASugarAMSnacks] = useState('');
  const [ASugarLunch,setASugarLunch] = useState('');
  const [ASugarPMSnacks,setASugarPMSnacks] = useState('');
  const [ASugarDinner,setASugarDinner] = useState('');
  const [ASugarMidnightSnacks,setASugarMidnightSnacks] = useState('');

  const [ClientID,setClientID] = useState('');
  const [MeasurementID,setMeasurementID] = useState('');

  const [C_MeasurementID,setC_MeasurementID] = useState('');
  const [C_exchangesID,setC_exchangesID] = useState('');
  const [C_meal_titleID,setC_meal_titleID] = useState('');
  
  return (
    <ResultContext.Provider value={{ result, setResult, otherValue, setOtherValue,vegetableEx,setVegEx ,fruitEx, setfruitEx,milkEx, setmilkEx,sugarEx, setsugarEx,riceAEx,setriceAEx,riceBEx,setriceBEx,riceCEx,setriceCEx,LFmeatEx,setLFmeatEx,MFmeatEx,setMFmeatEx,HFmeatEx,setHFmeatEx,fatEx,setfatEx,totalCarbs,settotalCarbs,totalProtein,settotalProtein,totalFat,settotalFat,totalKcal,settotalKcal,clientName,setClientname,clientAge,setClientAge,clientSex,setClientSex,waistC,setWaistC,hipC,setHipC,varweight,setweight,varheight,setheight,pal,setPal,whr,setwhr,bmi,setbmi,dbw,setdbw,carbs,setcarbs,protein,setprotein,fats,setfats,TER,setTER,normal,setNormal,
      MeasurementID,setMeasurementID,
      isLoggedIn, setLoggedIn,
      breakfast, setBreakfast,
      ClientID,setClientID,
      C_MeasurementID,setC_MeasurementID,
      C_exchangesID,setC_exchangesID,
      C_meal_titleID,setC_meal_titleID,
      AMSnack, setAMSnack,
      lunch, setLunch,
      PMSnack, setPMSnack,
      Dinner, setDinner
      ,AvegetablesBreakfast
      ,AvegetablesAMSnacks
      ,AvegetablesLunch
      ,AvegetablesPMSnacks
      ,AvegetablesDinner
      ,AfruitBreakfast
      ,AfruitAMSnacks
      ,AfruitLunch
      ,AfruitPMSnacks
      ,AfruitDinner
      ,AriceABreakfast
      ,AriceAAMSnacks
      ,AriceALunch
      ,AriceAPMSnacks
      ,AriceADinner
      ,AriceBBreakfast
      ,AriceBAMSnacks
      ,AriceBLunch
      ,AriceBPMSnacks
      ,AriceBDinner
      ,AriceCBreakfast
      ,AriceCAMSnacks
      ,AriceCLunch
      ,AriceCPMSnacks
      ,AriceCDinner,
      AWholeMilkBreakfast,setAWholeMilkBreakfast,
      AWholeMilkAMSnacks,setAWholeMilkAMSnacks,
      AWholeMilkLunch,setAWholeMilkLunch,
      AWholeMilkPMSnacks,setAWholeMilkPMSnacks,
      AWholeMilkDinner,setAWholeMilkDinner,
      ALFMilkBreakfast,setALFMilkBreakfast,
      ALFMilkAMSnacks,setALFMilkAMSnacks,
      ALFMilkLunch,setALFMilkLunch,
      ALFMilkPMSnacks,setALFMilkPMSnacks,
      ALFMilkDinner,setALFMilkDinner,
      ANFMilkBreakfast,setANFMilkBreakfast,
      ANFMilkAMSnacks,setANFMilkAMSnacks,
      ANFMilkLunch,setANFMilkLunch,
      ANFMilkPMSnacks,setANFMilkPMSnacks,
      ANFMilkDinner,setANFMilkDinner
      ,ALFBreakfast
      ,ALFAMSnacks
      ,ALFLunch
      ,ALFPMSnacks
      ,ALFDinner
      ,AMFBreakfast
      ,AMFAMSnacks
      ,AMFLunch
      ,AMFPMSnacks
      ,AMFDinner
      ,AHFBreakfast,setAHFBreakfast
      ,AHFAMSnacks,setAHFAMSnacks
      ,AHFLunch,setAHFLunch
      ,AHFPMSnacks,setAHFPMSnacks
      ,AHFDinner,setAHFDinner
      ,AFatBreakfast
      ,AFatAMSnacks
      ,AFatLunch
      ,AFatPMSnacks
      ,AFatDinner
      ,ASugarBreakfast
      ,ASugarAMSnacks
      ,ASugarLunch
      ,ASugarPMSnacks
      ,ASugarDinner
      ,setAvegetablesBreakfast
      ,setAvegetablesAMSnacks
      ,setAvegetablesLunch
      ,setAvegetablesPMSnacks
      ,setAvegetablesDinner
      ,setAfruitBreakfast
      ,setAfruitAMSnacks
      ,setAfruitLunch
      ,setAfruitPMSnacks
      ,setAfruitDinner
      ,setAriceABreakfast
      ,setAriceAAMSnacks
      ,setAriceALunch
      ,setAriceAPMSnacks
      ,setAriceADinner
      ,setAriceBBreakfast
      ,setAriceBAMSnacks
      ,setAriceBLunch
      ,setAriceBPMSnacks
      ,setAriceBDinner
      ,setAriceCBreakfast
      ,setAriceCAMSnacks
      ,setAriceCLunch
      ,setAriceCPMSnacks
      ,setAriceCDinner
      ,setALFBreakfast
      ,setALFAMSnacks
      ,setALFLunch
      ,setALFPMSnacks
      ,setALFDinner
      ,setAMFBreakfast
      ,setAMFAMSnacks
      ,setAMFLunch
      ,setAMFPMSnacks
      ,setAMFDinner
      ,setAFatBreakfast
      ,setAFatAMSnacks
      ,setAFatLunch
      ,setAFatPMSnacks
      ,setAFatDinner
      ,setASugarBreakfast
      ,setASugarAMSnacks
      ,setASugarLunch
      ,setASugarPMSnacks
      ,setASugarDinner
      ,AMSnack, setAMSnack
      ,lunch, setLunch
      ,PMSnack, setPMSnack
      ,Dinner, setDinner
      ,householdMeasureBreakfast, setHouseholdMeasureBreakfast
      ,menuBreakfast, setmenuBreakfast
      ,menuAmSnacks, setmenuAmSnacks
      ,menuLunch, setmenuLunch
      ,menuPmSnacks, setmenuPmSnacks
      ,menuDinner, setmenuDinner
      ,householdMeasureAmSnacks, setHouseholdMeasureAmSnacks
      ,householdMeasureLunch, setHouseholdMeasureLunch
      ,householdMeasurePmSnacks, setHouseholdMeasurePmSnacks
      ,householdMeasureDinner, setHouseholdMeasureDinner,
      birthdate,setbirthdate,
      milkChoice, setMilkChoice,
      
      WholeMilkEx, setWholeMilkEx,
      LFMilkEx, setLFMilkEx,
      NFMilkEx, setNFMilkEx,

      MidnightSnacks, setMidnightSnacks,
      menuMidnightSnacks, setmenuMidnightSnacks,
      householdMeasureMidnightSnacks, setHouseholdMeasureMidnightSnacks,

      AWholeMilkBreakfast,setAWholeMilkBreakfast,
      AWholeMilkAMSnacks,setAWholeMilkAMSnacks,
      AWholeMilkLunch,setAWholeMilkLunch,
      AWholeMilkPMSnacks,setAWholeMilkPMSnacks,
      AWholeMilkDinner,setAWholeMilkDinner,
      ALFMilkBreakfast,setALFMilkBreakfast,
      ALFMilkAMSnacks,setALFMilkAMSnacks,
      ALFMilkLunch,setALFMilkLunch,
      ALFMilkPMSnacks,setALFMilkPMSnacks,
      ALFMilkDinner,setALFMilkDinner,
      ANFMilkBreakfast,setANFMilkBreakfast,
      ANFMilkAMSnacks,setANFMilkAMSnacks,
      ANFMilkLunch,setANFMilkLunch,
      ANFMilkPMSnacks,setANFMilkPMSnacks,
      ANFMilkDinner,setANFMilkDinner,

      AvegetablesMidnightSnacks,setAvegetablesMidnightSnacks,
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
      ASugarMidnightSnacks,setASugarMidnightSnacks,
      ClientLastName,setClientLastName,
      ClientfirstName,setClientfirstName,
      Clientdesignation,setClientdesignation,
      Clientremarks,setClientremarks
      }}>
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;