import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const BMIChart = ({ clientId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (clientId) {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT cm.BMI as cmBMI, cm.assessment_date
           FROM client_measurements AS cm
           WHERE cm.client_id = ? 
           ORDER BY cm.assessment_date DESC`,
          [clientId],
          (_, { rows }) => {
            const data = rows._array;
            setData(data);
          },
          (_, error) => {
            console.error('Error fetching data:', error);
          }
        );
      });
    }
  }, [clientId]);
  

  return (
    <View>
      <Text>BMI Chart</Text>
      <LineChart
        data={{
          labels: data.map((item) => item.assessment_date),
          datasets: [
            {
              data: data.map((item) => item.cmBMI),
            },
          ],
        }}
        width={300}
        height={200}
        yAxisLabel="BMI"
        yAxisInterval={1}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#000',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default BMIChart;
