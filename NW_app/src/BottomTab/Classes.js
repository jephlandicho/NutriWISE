import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Card, DefaultTheme, TextInput, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import MyTheme from '../Components/MyTheme';

const staticClassrooms = [
  { id: 1, name: 'English Class', teacher: 'John Doe' },
  { id: 2, name: 'Math Class', teacher: 'Jane Smith' },
  { id: 3, name: 'Science Class', teacher: 'Michael Johnson' },
  // Add more classrooms as needed
];

const Classes = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [classroomCode, setClassroomCode] = useState('');

  // Function to handle classroom press
  const handleClassroomPress = (classroom) => {
    Alert.alert(
      'Classroom Details',
      `Classroom Name: ${classroom.name}\nTeacher: ${classroom.teacher}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
  };

  // Function to render each classroom card
  const renderClassroomCard = (classroom) => {
    return (
      <TouchableOpacity
        key={classroom.id}
        style={styles.classroomCard}
        onPress={() => handleClassroomPress(classroom)}
      >
        <Text style={styles.classroomTitle}>{classroom.name}</Text>
        <Text style={styles.classroomTeacher}>Teacher: {classroom.teacher}</Text>
      </TouchableOpacity>
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <Button mode="outlined" onPress={toggleModal} style={styles.button}>
          Enter Classroom Code
        </Button>
        {staticClassrooms.map(renderClassroomCard)}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
        >
          <View style={styles.modalContent}>
            <TextInput
              label="Classroom Code"
              value={classroomCode}
              onChangeText={setClassroomCode}
            />
            <Button mode="contained" onPress={toggleModal} style={styles.submitButton}>
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
