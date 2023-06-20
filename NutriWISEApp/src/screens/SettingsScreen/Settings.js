import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';


const Settings = () => {
  const [mealNames, setMealNames] = useState([]);

  useEffect(() => {
//list all the users
const listUsers = async () => {
  let sql = "SELECT * FROM meals";
  db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, resultSet) => {
          var length = resultSet.rows.length;
          for (var i = 0; i < length; i++) {
              console.log(resultSet.rows.item(i));
          }
      }, (error) => {
          console.log("List user error", error);
      })
  })
}
  }, []);

  return (
    <View>
      {mealNames.map((mealName, index) => (
        <Text key={index}>{mealName}</Text>
      ))}
    </View>
  );
};

export default Settings;
