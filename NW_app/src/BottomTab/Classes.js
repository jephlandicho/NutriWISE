import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Provider as PaperProvider, Button, TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
import CustomInput from '../Components/CustomInput';
import { useForm, Controller } from 'react-hook-form';

const db = SQLite.openDatabase('mydatabase.db');

const Classes = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [classroomCode, setClassroomCode] = useState('');
  const [classroomDetails, setClassroomDetails] = useState(null);
  const [fetchedClasses, setFetchedClasses] = useState([]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(fetchedClasses)
    // Create tables on app launch
    createTables()
      .then(() => {
        console.log('Tables created successfully.');
        // Fetch and set the classes from the local SQLite database
        fetchClassesFromDatabase();
      })
      .catch((error) => {
        console.error('Error creating tables:', error);
      });
  }, []);

  const createTables = () => {
    const createClassesTableQuery = `
      CREATE TABLE IF NOT EXISTS classes (
        id INTEGER PRIMARY KEY,
        professor_fullName TEXT,
        professor_email TEXT,
        class_name TEXT,
        class_code TEXT,
        description TEXT
      );
    `;

    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(createClassesTableQuery, [], resolve, (_, error) => reject(error));
      });
    });
  };

  const fetchClassesFromDatabase = async () => {
    try {
      db.transaction((transaction) => {
        transaction.executeSql('SELECT * FROM classes;', [], (_, resultSet) => {
          const classes = [];
          for (let i = 0; i < resultSet.rows.length; i++) {
            const row = resultSet.rows.item(i);
            classes.push(row);
          }
          setFetchedClasses(classes);
        });
      });
    } catch (error) {
      console.error('Error fetching classes from database:', error);
    }
  };
  

  const handleClassroomPress = (classroom) => {
    Alert.alert(
      'Classroom Details',
      `Classroom Name: ${classroom.class_name}\nProfessor: ${classroom.professor_fullName}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  const renderFetchedClassroomCard = () => {
    return fetchedClasses.map((classroom) => (
      <TouchableOpacity
        key={classroom.id}
        style={styles.classroomCard}
        onPress={() => handleClassroomPress(classroom)}
      >
        <Text style={styles.classroomTeacher}>ID: {classroom.id}</Text>
        <Text style={styles.classroomTitle}>{classroom.class_name}</Text>
        <Text style={styles.classroomTeacher}>Professor: {classroom.professor_fullName}</Text>
        <Text style={styles.classroomTeacher}>Email: {classroom.professor_email}</Text>
        <Text style={styles.classroomTeacher}>Code: {classroom.class_code}</Text>
        <Text style={styles.classroomTeacher}>Section: {classroom.description}</Text>
      </TouchableOpacity>
    ));
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitClassroomCode = async (data) => {
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please turn on your internet connection to continue.');
      return;
    }

    try {
      const response = await fetch('https://nutriwise.website/api/classroom.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClassroomDetails(data.classData);
        toggleModal();

        // Save the fetched data to SQLite
        try {
          const insertedId = await insertClass(
            data.classData.id,
            data.classData.professor_fullname,
            data.classData.professor_email,
            data.classData.class_name,
            data.classData.class_code,
            data.classData.description
          );
          console.log('Data inserted with ID:', insertedId);
          Alert.alert('Classroom Found!', 'Classroom has been added to your list of classes');
          fetchClassesFromDatabase();
          
        } catch (error) {
          Alert.alert('No Classroom Found!', 'Please make sure that you enter the correct code');
          // console.error('Error inserting data to database:', error);
        }
      } else {
        Alert.alert('No Classroom Found!', 'Please make sure that you enter the correct code');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const insertClass = (id, professor_fullName,professor_email, className, classCode, description) => {
    const insertClassQuery = `
      INSERT INTO classes (id, professor_fullName,professor_email, class_name, class_code, description)
      VALUES (?, ?, ?, ?, ?,?);
    `;

    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          insertClassQuery,
          [id, professor_fullName,professor_email, className, classCode, description],
          (_, resultSet) => resolve(resultSet.insertId),
          (_, error) => reject(error)
        );
      });
    });
  };

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <Button mode="outlined" onPress={toggleModal} style={styles.button}>
          Enter Classroom Code
        </Button>
        {renderFetchedClassroomCard()}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <CustomInput
              title="Classroom Code"
              name="classroomCode"
              label="Classroom Code"
              
              control={control}
              
            />
            <Button mode="contained" onPress={handleSubmit(submitClassroomCode)} style={styles.submitButton}>
              Submit
            </Button>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
  },
  classroomCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  classroomTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  classroomTeacher: {
    fontSize: 16,
  },
  button: {
    marginBottom: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%', // Set the width of the modal content
  },
  submitButton: {
    marginTop: 16,
  },
});

export default Classes;
