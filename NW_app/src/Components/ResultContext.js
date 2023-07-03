import React, { createContext, useState } from 'react';

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [otherValue, setOtherValue] = useState('');
  const [clientName,setClientname] = useState('');
  const [clientAge,setClientAge] = useState('');
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
  const [sugarEx, setsugarEx] = useState('');
  const [riceAEx,setriceAEx] = useState('');
  const [riceBEx,setriceBEx] = useState('');
  const [riceCEx,setriceCEx] = useState('');
  const [LFmeatEx,setLFmeatEx] = useState('');
  const [MFmeatEx,setMFmeatEx] = useState('');
  const [fatEx,setfatEx] = useState('');
  const [totalCarbs,settotalCarbs] = useState('');
  const [totalProtein,settotalProtein] = useState('');
  const [totalFat,settotalFat] = useState('');
  const [totalKcal,settotalKcal] = useState('');
  const [normal,setNormal] = useState('');
  const [breakfast, setBreakfast] = useState({});



  return (
    <ResultContext.Provider value={{ result, setResult, otherValue, setOtherValue,vegetableEx,setVegEx ,fruitEx, setfruitEx,milkEx, setmilkEx,sugarEx, setsugarEx,riceAEx,setriceAEx,riceBEx,setriceBEx,riceCEx,setriceCEx,LFmeatEx,setLFmeatEx,MFmeatEx,setMFmeatEx,fatEx,setfatEx,totalCarbs,settotalCarbs,totalProtein,settotalProtein,totalFat,settotalFat,totalKcal,settotalKcal,clientName,setClientname,clientAge,setClientAge,clientSex,setClientSex,waistC,setWaistC,hipC,setHipC,varweight,setweight,varheight,setheight,pal,setPal,whr,setwhr,bmi,setbmi,dbw,setdbw,carbs,setcarbs,protein,setprotein,fats,setfats,TER,setTER,normal,setNormal,breakfast, setBreakfast}}>
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;