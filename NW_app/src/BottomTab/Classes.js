import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet,ScrollView } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Provider as PaperProvider, Button, TextInput,DataTable } from 'react-native-paper';
import Modal from 'react-native-modal';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
import CustomInput from '../Components/CustomInput';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';


import { useForm, Controller } from 'react-hook-form';

const db = SQLite.openDatabase('mydatabase.db');

const Classes = () => {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [isModalVisible, setModalVisible] = useState(false);
  const [classroomCode, setClassroomCode] = useState('');
  const [classroomDetails, setClassroomDetails] = useState(null);
  const [fetchedClasses, setFetchedClasses] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([3, 5, 7]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const cardColorss = ['#FF5733', '#33FF57', '#5733FF', '#FF3366', '#66FF33', '#3366FF'];
  const cardColors = [
    "#00FF00", // Lime Green
    "#32CD32", // Lime Green (2)
    "#7FFF00", // Chartreuse
    "#ADFF2F", // Green Yellow
    "#00FF7F", // Spring Green
    "#00FA9A", // Medium Spring Green
    "#98FB98", // Pale Green
    "#90EE90"  // Light Green
  ];
  const cardBackgroundImages = [
    require('../Images/Honors_thumb.jpg'),
    require('../Images/img_backtoschool_thumb.jpg'),
    require('../Images/img_bookclub_thumb.jpg'),
    // Add more image sources as needed
  ];
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
  
    const createYourTableQuery = `
      CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        class_id INTEGER,
        schedule_day TEXT,
        start_time TIME,
        end_time TIME,
        FOREIGN KEY (class_id) REFERENCES classes(id)
      );
    `;
  
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(createClassesTableQuery, [], () => {
          transaction.executeSql(createYourTableQuery, [], resolve, (_, error) => reject(error));
        }, (_, error) => reject(error));
      });
    });
  };
  

  const handleDelete = (id) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM classes WHERE id = ?',
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            Alert.alert('Success', 'Successfully Unenrolled');
            console.log('Item deleted successfully');
            fetchClassesFromDatabase(); // Call a function to refresh the table data
          }
        },
        (error) => {
          console.log('Error deleting item:', error);
        }
      );
    });
  };
  
  const fetchClassesFromDatabase = async () => {
    try {
      db.transaction((transaction) => {
        transaction.executeSql(`SELECT
        classes.*,
        GROUP_CONCAT(DISTINCT
            schedule.schedule_day || ' ' ||
            (
                CASE
                    WHEN substr(schedule.start_time, 1, 2) < '12' THEN printf('%02d:%02d AM', substr(schedule.start_time, 1, 2), substr(schedule.start_time, 4, 2))
                    WHEN substr(schedule.start_time, 1, 2) = '12' THEN printf('%02d:%02d PM', substr(schedule.start_time, 1, 2), substr(schedule.start_time, 4, 2))
                    ELSE printf('%02d:%02d PM', substr(schedule.start_time, 1, 2) - 12, substr(schedule.start_time, 4, 2))
                END
            ) || '-' ||
            (
                CASE
                    WHEN substr(schedule.end_time, 1, 2) < '12' THEN printf('%02d:%02d AM', substr(schedule.end_time, 1, 2), substr(schedule.end_time, 4, 2))
                    WHEN substr(schedule.end_time, 1, 2) = '12' THEN printf('%02d:%02d PM', substr(schedule.end_time, 1, 2), substr(schedule.end_time, 4, 2))
                    ELSE printf('%02d:%02d PM', substr(schedule.end_time, 1, 2) - 12, substr(schedule.end_time, 4, 2))
                END
            )
        ) AS schedule_info
    FROM
        classes
    INNER JOIN
        schedule ON classes.id = schedule.class_id
    GROUP BY
        classes.id;`, [], (_, resultSet) => {
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
    if (!isConnected) {
      Alert.alert('No Internet Connection', 'Please turn on your internet connection to view the class stream.');
      return;
    }
    const classID = classroom.id;
    navigation.navigate('Stream', { classID });
  };

  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = fetchedClasses.slice(from, to);

  const renderFetchedClassroomCard = () => {
    if (displayedData.length === 0) {
      return (
        <View style={styles.noClassesContainer}>
          <Text style={styles.noClassesText}>No classes available</Text>
        </View>
      );
    }
    return displayedData.map((classroom, index) => {
      return (
        <ImageBackground
          key={classroom.id}
          source={cardBackgroundImages[index % cardBackgroundImages.length]}
          style={styles.classroomCard}
          imageStyle={styles.cardBackgroundImage}
        >
          <TouchableOpacity
            key={classroom.id}
            onPress={() => handleClassroomPress(classroom)}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.classroomTitle}>{classroom.class_name}</Text>
                <Text style={styles.classroomTeacher}>{classroom.description}</Text>
                <Text style={styles.scheduleTime}>
                  {classroom.schedule_info.split(',').map((schedule, index) => (
                    <Text key={index}>
                      {schedule}
                      {index < classroom.schedule_info.split(',').length - 1 ? '\n' : ''}
                    </Text>
                  ))}
                </Text>
                <View style={styles.space}></View>
                <Text style={styles.classroomTeacher}>{classroom.professor_fullName}</Text>

              </View>
              <View>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDelete(classroom.id)}
                >
                  <Ionicons name="md-trash-outline" size={20} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      );
    });
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
        const responseData = await response.json();
        console.log('responseData',responseData);
  
        if (responseData.success) {
          const classData = responseData.classData[0];
          // Access individual schedule elements
          console.log('classData',classData)
          const scheduleDays = classData.sched_day;
          const startTimes = classData.start_time;
          const endTimes = classData.end_time;
          setClassroomDetails(classData);
          toggleModal();
  
          // Save the fetched data to SQLite
          try {
            const insertedId = await insertClass(
              classData.id,
              classData.professor_fullname,
              classData.professor_email,
              classData.class_name,
              classData.class_code,
              classData.description
            );
            Alert.alert('Classroom Found!', 'Classroom has been added to your list of classes');
            fetchClassesFromDatabase();
  
          } catch (error) {
            Alert.alert('Error', 'An error occurred while inserting data to the database');
            console.error('Error inserting data to database:', error);
          }
          for (let i = 0; i < scheduleDays.length; i++) {
            const schedule_day = scheduleDays[i];
            const start_time = startTimes[i];
            const end_time = endTimes[i];
          
            // Call your insert function to insert this item into the table
            insertYourTable(classData.id, schedule_day, start_time, end_time)
              .then(insertedId => {
                console.log(`Data inserted with ID: ${insertedId}`);
              })
              .catch(error => {
                console.error('Error inserting data to the database:', error);
              });
          }
        } else {
          Alert.alert('No Classroom Found!', responseData.message || 'Please make sure that you enter the correct code');
        }
      } else {
        Alert.alert('Error', 'An error occurred while fetching data from the server');
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

  const insertYourTable = (class_id, schedule_day, start_time, end_time) => {
    const insertYourTableQuery = `
      INSERT INTO schedule (class_id, schedule_day, start_time, end_time)
      VALUES (?, ?, ?, ?);
    `;
  
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          insertYourTableQuery,
          [class_id, schedule_day, start_time, end_time],
          (_, resultSet) => resolve(resultSet.insertId),
          (_, error) => reject(error)
        );
      });
    });
  };



  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
          <View style={styles.meabuttonContainer}>
            <TouchableOpacity style={styles.meabutton} onPress={toggleModal}>
              <Text style={styles.buttonText}>
                <Ionicons name="add-circle-outline" size={20} color="black" /> Add
              </Text>
            </TouchableOpacity>
          </View>

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
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(fetchedClasses.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${Math.min((page + 1) * itemsPerPage, fetchedClasses.length)} of ${
            fetchedClasses.length
          }`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 9,
    paddingTop: 5,
  },
  container1: {
    backgroundColor: '#fff',
  },
  classroomCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  space: {
    height: 70, // Adjust the height as needed to create the desired space
  },
  classroomTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    color: '#FFFFFF',
  },
  classroomTeacher: {
    fontSize: 16,
    color: '#FFFFFF',
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 0.45, // Adjust the flex value to control the width of the buttons
  },
  meabutton: {
    width: '25%',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  meabuttonContainer: {
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 5,
  },
  cardBackgroundImage: {
    resizeMode: 'cover', // You can adjust this property to control how the image is scaled within the card
    borderRadius: 8,
    padding: 16,
    shadowColor: 'black',
  },
  noClassesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change to your desired background color
  },

  noClassesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray', // Change to your desired text color
  },
  scheduleContainer: {
    marginTop: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  
  scheduleHeading: {
    fontSize: 15,
    color: 'white' ,
    fontWeight: 'bold',
  },
  
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  scheduleDay: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  scheduleTime: {
    color: 'white' ,
    fontSize: 12,
  },
});

export default Classes;
