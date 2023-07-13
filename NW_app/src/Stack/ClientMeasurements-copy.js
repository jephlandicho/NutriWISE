import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity,Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function ClientMeasurements() {
    const [tableData, setTableData] = useState([]);
    const route = useRoute();
    const { id } = route.params;

    useEffect(() => {
        const db = SQLite.openDatabase('mydatabase.db');
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM clients WHERE id = ?',
            [id],
            (_, { rows }) => {
              const data = rows._array;
              setTableData(data);
            },
            (error) => {
              console.log('Error fetching table data: ', error);
            }
          );
        });
      }, []);


  const renderRow = ({ item }) => (
    <View style={styles.row}>
        
      <Text style={styles.cell}>{item.waistC}</Text>
      <Text style={styles.cell}>{item.hipC}</Text>
      <Text style={styles.cell}>{item.varweight}</Text>
      <Text style={styles.cell}>{item.varheight}</Text>
      <Text style={styles.cell}>{item.pal}</Text>
      <Text style={styles.cell}>{item.whr}</Text>
      <Text style={styles.cell}>{item.dbw}</Text>
      <Text style={styles.cell}>{item.carbs}</Text>
      <Text style={styles.cell}>{item.protein}</Text>
      <Text style={styles.cell}>{item.fats}</Text>
      <Text style={styles.cell}>{item.TER}</Text>


    <TouchableOpacity
      style={styles.button}
      onPress={() => handleView(item.id)}
    >
      <Ionicons name="md-eye" size={20} color="white" />
    </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Waist C</Text>
        <Text style={styles.headerCell}>Hip C</Text>
        <Text style={styles.headerCell}>Weight</Text>
        <Text style={styles.headerCell}>Height</Text>
        <Text style={styles.headerCell}>PAL</Text>
        <Text style={styles.headerCell}>WHR</Text>
        <Text style={styles.headerCell}>DBW</Text>
        <Text style={styles.headerCell}>Carbs</Text>
        <Text style={styles.headerCell}>Protein</Text>
        <Text style={styles.headerCell}>Fats</Text>
        <Text style={styles.headerCell}>TER</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>

      <FlatList
        data={tableData}
        renderItem={renderRow}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    cell: {
      flex: 1,
    },
    button: {
      marginLeft: 5,
      backgroundColor: '#c4c4c4',
      padding: 5,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default ClientMeasurements;
