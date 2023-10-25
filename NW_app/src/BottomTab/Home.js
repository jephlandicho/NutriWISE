import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView,TouchableWithoutFeedback,Linking,Image } from 'react-native';
import { Avatar, Card, Provider as PaperProvider,Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState([]); // State for chart data
  const [facebookFeed, setFacebookFeed] = useState(null); // State for Facebook feed data
  useEffect(() => {
    getUserData();
    fetchChartData();
    fetchFacebookFeed()
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

  const fetchFacebookFeed = async () => {
    try {
      const accessToken = 'EAAJMKel19P4BO9hxvqqBLHiGlObMVy7rUpsabqo785DxZCHgL3pQ4pgegOpXbEUX1d9PnvbUAs3jZBV7gbrAxTIDZAx0CUzr3nnroFPTdXR6QCTGkbB54RUGz2aoLyPXXuUscQPP82KwZAEXt8Ptf0ah9aln83MBSV1oHdZBXCejcZCqgXzEPFzdZAXgZAbPL9sZD'; // Replace with your Facebook access token
      const response = await fetch(
        `https://graph.facebook.com/v13.0/104766035512845/feed?access_token=${accessToken}&fields=message,attachments&limit=1`
      );

      if (response.ok) {
        const data = await response.json();
        setFacebookFeed(data);
      } else {
        console.error('Failed to fetch Facebook feed data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const fetchChartData = async () => {
    try {
      const response = await fetch('https://nutriwise.website/api/chart.php'); // Replace with your server URL
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const uniqueColors = ['#FF5733', '#33FF57', '#5733FF', '#FF3370', '#33B6FF'];
  const totalRemarkCount = chartData.reduce((total, data) => total + parseFloat(data.remark_count), 0);
  console.log(totalRemarkCount);

  const pageUrl = 'https://facebook.com/ascendbsutneuarasof'; // Replace with the Facebook page URL
  const pageUrls = 'https://web.facebook.com/conahs.batstateu.arasof';
  const openFacebookPage = () => {
    Linking.openURL(pageUrl);
  };
  const openFacebookPage1 = () => {
    Linking.openURL(pageUrls);
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
            <Card.Title title="Facebook Pages" />
            <Card.Content>
              {/* Display web content using a WebView */}
              <TouchableWithoutFeedback onPress={openFacebookPage1}>
            <View style={styles.header1}> 
              <Avatar.Image
                size={40}
                source={{
                  uri: 'https://scontent.fmnl25-3.fna.fbcdn.net/v/t39.30808-1/365911030_738693491393222_1151432630298230_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEzr6mC3Sj-8VBRQjYxmVcstkHxYjWG75K2QfFiNYbvklBOnqUM7c6BPhqFHvHr8dPrbrHC3EtlQhOWct4hhnW1&_nc_ohc=dZTeJ0GohhwAX8-EVjY&_nc_ht=scontent.fmnl25-3.fna&oh=00_AfBWwVGjf4J9q4WgrzlhcvhFX17yaRtZrodIl6qCYKgEpQ&oe=653CDC35', // Replace with the Facebook page profile picture URL
                }}
              />
              <Text style={styles.userName1}>Bat State U ARASOF-Nasugbu College of Nursing and Allied Health Sciences</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={openFacebookPage}>
            <View style={styles.header1}>
              <Avatar.Image
                size={40}
                source={{
                  uri: 'https://scontent.fmnl25-3.fna.fbcdn.net/v/t39.30808-1/378343972_122110856198031779_2164195888321458493_n.jpg?stp=c25.36.190.190a_dst-jpg_p240x240&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFIwu51CCP2eLnWEtPjvyXCYZ29pL8KIdVhnb2kvwoh1bXxbpnj8V05VyWDvQPOhc042AQaNa5CbiETL3uTuIVr&_nc_ohc=cCqlopEhdr8AX-BaBQ_&_nc_ht=scontent.fmnl25-3.fna&oh=00_AfC8zw44jVDOxa0uf5Eiwi9HJK644o743CE-lr2TNUGnsA&oe=653E7219', // Replace with the Facebook page profile picture URL
                }}
              />
              <Text style={styles.userName1}>Alliance of Students' Collegiate Excellence in Nutrition and Dietetics</Text>
            </View>
          </TouchableWithoutFeedback>
            </Card.Content>
          </Card>
          {facebookFeed && (
  <View>
{facebookFeed && (
  <View>
    {facebookFeed.data.map((post, index) => (
      <Card key={index} style={styles.card2}>
        <Card.Title title="Announcements" />
        <Card.Content>
          {post.attachments && post.attachments.data[0] && (
            <>
              {post.attachments.data[0].media && (
                <Image
                  source={{ uri: post.attachments.data[0].media.image.src }}
                  style={styles.image} // Use a fixed width and height
                />
              )}
              {post.message && (
                <Text style={styles.messageText}>{post.message}</Text>
              )}
              {post.attachments.data[0].target && (
                <Text style={styles.linkText} >
                <Button mode="contained" onPress={() => Linking.openURL(post.attachments.data[0].target.url)}>
                View Post
                </Button>
                </Text>
              )}
            </>
          )}
        </Card.Content>
      </Card>
    ))}
  </View>
)}

  </View>
)}
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
  card2: {
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    marginBottom: '60%',
  },
  header1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 5
  },
  userName1: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  profile: {
    marginRight: 10,
  },
  image: {
    width: '100%', // Replace with your desired width
    height: '20%', // Replace with your desired height
  },
  messageText: {
    marginTop: 10,
    fontSize: 16,
  },
  linkText: {
    marginTop: 10,
  },
});

export default Home;
