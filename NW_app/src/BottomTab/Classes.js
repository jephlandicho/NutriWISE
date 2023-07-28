import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const db = SQLite.openDatabase('mydatabase.db');

const Classes = () => {
  const [dataFromDB, setDataFromDB] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      displayData();
    }
  }, [isFocused]);

  const displayData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT DISTINCT c.name, c.birthdate, c.sex, m.*, mt.meal_title, mp.*
        FROM client AS c
        INNER JOIN client_measurements AS cm ON c.id = cm.client_id
        INNER JOIN exchanges AS e ON cm.id = e.measurement_id
        INNER JOIN meal_title AS mt ON e.id = mt.exchanges_id
        INNER JOIN meal AS m ON mt.id = m.meal_title_id
        INNER JOIN meal_plan AS mp ON m.id = mp.meal_name_id
        WHERE m.meal_title_id = ?
        `,
        ['3953192'], // Replace with your desired meal_name_id
        (_, { rows }) => {
          const content = [];
          for (let i = 0; i < rows.length; i++) {
            content.push(rows.item(i));
          }
          setDataFromDB(content);
        },
        (error) => {
          console.log('Error while fetching data: ', error);
        }
      );
    });
  };

  const generateHtml = () => {
    let htmlContent = `
      <html>
        <head>
          <style>
            h1 {
              text-align: center;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Data from Database</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Birthdate</th>
              <th>Sex</th>
              <th>Meal Time</th>
              <th>Food ID</th>
              <th>Exchange Distribution</th>
              <th>Household Measure</th>
            </tr>
    `;

    dataFromDB.forEach((item) => {
      htmlContent += `
        <tr>
          <td>${item.name}</td>
          <td>${item.birthdate}</td>
          <td>${item.sex}</td>
          <td>${item.meal_time}</td>
          <td>${item.food_id}</td>
          <td>${item.exchange_distribution}</td>
          <td>${item.household_measurement}</td>
        </tr>
      `;
    });

    htmlContent += `
          </table>
        </body>
      </html>
    `;

    return htmlContent;
  };

  const generatePdf = async () => {
    if (dataFromDB.length === 0) {
      console.log('No data to generate PDF');
      return;
    }

    const html = generateHtml();
    const timestamp = new Date().getTime(); // Get current timestamp
    const fileUri = `${FileSystem.documentDirectory}data_${timestamp}.pdf`;

    try {
      const file = await printToFileAsync({
        html: html,
        width: 612,
        height: 792,
        base64: false,
      });

      await FileSystem.moveAsync({
        from: file.uri,
        to: fileUri,
      });

      await shareAsync(fileUri);
    } catch (error) {
      console.log('Error while generating PDF: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data from Database:</Text>
      <FlatList
        data={dataFromDB}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.contentText}>
            {item.name} - {item.birthdate} - {item.sex} - {item.meal_time} - {item.food_id} - {item.exchange_distribution} - {item.household_measurement}
          </Text>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Generate PDF" onPress={generatePdf} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 100
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentText: {
    marginBottom: 4,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Classes;
