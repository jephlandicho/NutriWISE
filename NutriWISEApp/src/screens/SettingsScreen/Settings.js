import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


const Settings = () => {
  const [mealNames, setMealNames] = useState([]);


  return (
    <View>
      {mealNames.map((mealName, index) => (
        <Text key={index}>{mealName}</Text>
      ))}
    </View>
  );
};

export default Settings;
