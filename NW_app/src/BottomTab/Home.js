import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Card, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [todayDay, setTodayDay] = useState('');

  useEffect(() => {
    getUserData();
    const today = new Date();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[today.getDay()];
    setTodayDay(currentDay); // Set today's day

    fetchUpcomingClasses(currentDay); // Pass the currentDay to fetchUpcomingClasses
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserData(parsedUserData);
      } else {
        // User data doesn't exist in local storage
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUpcomingClasses = (currentDay) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT classes.*, schedule.start_time AS s_time ,GROUP_CONCAT(DISTINCT schedule.schedule_day || ' ' || (CASE WHEN substr(schedule.start_time, 1, 2) < '12' THEN printf('%02d:%02d AM', substr(schedule.start_time, 1, 2), substr(schedule.start_time, 4, 2)) WHEN substr(schedule.start_time, 1, 2) = '12' THEN printf('%02d:%02d PM', substr(schedule.start_time, 1, 2), substr(schedule.start_time, 4, 2)) ELSE printf('%02d:%02d PM', substr(schedule.start_time, 1, 2) - 12, substr(schedule.start_time, 4, 2)) END) || '-' || (CASE WHEN substr(schedule.end_time, 1, 2) < '12' THEN printf('%02d:%02d AM', substr(schedule.end_time, 1, 2), substr(schedule.end_time, 4, 2)) WHEN substr(schedule.end_time, 1, 2) = '12' THEN printf('%02d:%02d PM', substr(schedule.end_time, 1, 2), substr(schedule.end_time, 4, 2)) ELSE printf('%02d:%02d PM', substr(schedule.end_time, 1, 2) - 12, substr(schedule.end_time, 4, 2)) END)) AS schedule_info FROM classes INNER JOIN schedule ON classes.id = schedule.class_id WHERE schedule.schedule_day = ? GROUP BY classes.id;`,
        [currentDay], // Pass the currentDay as a parameter
        (_, { rows }) => {
          const data = rows._array.filter(classData => isClassTimeUpcoming(classData));
          setUpcomingClasses(data); // Update the state with the filtered data
        },
        (error) => {
          console.error('Error fetching upcoming classes:', error);
        }
      );
    });
  };

  const isClassTimeUpcoming = (classData) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
    const classStartTimeString = classData.s_time; // Use the alias 's_time' for class start time
    
    // Ensure both times are in the same 24-hour format with two digits for the hour
    const formattedCurrentTime = currentTime.replace(/\s/g, '');
    const formattedClassStartTime = classStartTimeString.padStart(5, '0').replace(/\s/g, ''); // Ensure two digits for the hour
  
    console.log("formattedCurrentTime", formattedCurrentTime);
    console.log("formattedClassStartTime", formattedClassStartTime);
    console.log(classData);
  
    return formattedCurrentTime < formattedClassStartTime;
  };
  
  return (
    <PaperProvider theme={MyTheme}>
      <View style={styles.container}>
        <ScrollView>
          {userData && (
            <View style={styles.header}>
              <Avatar.Text size={64} label={userData.fullName.charAt(0).toUpperCase()} />
              <Text style={styles.userName}>{userData.fullName}</Text>
            </View>
          )}

          <Card style={styles.card}>
            <Card.Title title="Upcoming Classes" />
            <Card.Content>
              {/* Display a list of upcoming classes */}
              {upcomingClasses.map((classData, index) => (
                <View key={index}>
                  <Text>{`Class: ${classData.class_name}`}</Text>
                  {classData.schedule_info.split(',').map((schedule, scheduleIndex) => (
                    <Text key={scheduleIndex}>
                      {schedule}
                    </Text>
                  ))}
                </View>
              ))}
            </Card.Content>
          </Card>

          {/* Add more cards or components for the to-do list, announcements, attendance, resources, etc. */}
        </ScrollView>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userName: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
});

export default Home;
