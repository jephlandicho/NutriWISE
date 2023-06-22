import React, { createContext, useState } from 'react';

export const ResultContext = createContext();

export const ResultProvider = ({ children }) => {
  const [result, setResult] = useState('');
  const [otherValue, setOtherValue] = useState('');
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



  return (
    <ResultContext.Provider value={{ result, setResult, otherValue, setOtherValue,vegetableEx,setVegEx ,fruitEx, setfruitEx,milkEx, setmilkEx,sugarEx, setsugarEx,riceAEx,setriceAEx,riceBEx,setriceBEx,riceCEx,setriceCEx,LFmeatEx,setLFmeatEx,MFmeatEx,setMFmeatEx,fatEx,setfatEx,totalCarbs,settotalCarbs,totalProtein,settotalProtein,totalFat,settotalFat,totalKcal,settotalKcal}}>
      {children}
    </ResultContext.Provider>
  );
};

export default ResultContext;