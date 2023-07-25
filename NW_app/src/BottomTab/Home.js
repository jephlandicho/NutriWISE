import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Card, Divider, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import { LineChart } from 'react-native-chart-kit';

const Home = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserData();
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

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
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
              <Text>Class 1 - ComProg (9:00 AM)</Text>
              <Text>Class 2 - Application Development (11:00 AM)</Text>
              <Text>Class 3 - Integration of Application (2:00 PM)</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Assignments/Exams" />
            <Card.Content>
              {/* Display a list of pending assignments/exams */}
              <Text>ComProg Assignment (Due: July 25)</Text>
              <Text>Integration of Application Exam (Date: July 30)</Text>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="Chart" />
            <Card.Content>
              {/* Display a line chart */}
              <LineChart
                data={chartData}
                width={300}
                height={200}
                chartConfig={{
                  backgroundColor: '#FFFFFF',
                  backgroundGradientFrom: '#FFFFFF',
                  backgroundGradientTo: '#FFFFFF',
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                bezier
              />
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
    paddingTop: 30
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
  cardActions: {
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 16,
  },
});

export default Home;
