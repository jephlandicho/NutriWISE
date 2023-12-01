import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, Image, Alert } from 'react-native';
import { Avatar, Card, Provider as PaperProvider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';
const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [facebookFeed, setFacebookFeed] = useState(null); // State for Facebook feed data
  const [facebookFeeds, setFacebookFeeds] = useState(null);
  useEffect(() => {
    getUserData();
    fetchFacebookFeed();
    checkConnection();
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

  const checkConnection = async () => {
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      Alert.alert('Connected', 'Connected to the Internet');
    }
    else { Alert.alert('No Internet', 'No internet connection found');}
  }

  const checkInternetConnectivity = async () => {
    const netInfoState = await NetInfo.fetch();
    return netInfoState.isConnected;
  };
  const fetchFacebookFeed = async () => {
    try {
      const accessToken = 'EAAJMKel19P4BOxmsIAUvLsMRTr6KtMpDB6XuMUTVAAz0auzHAJNix2fMwFQodiYhzdHK8w2hZBNolggtbm77aVsBsJ66mytZB0M8MHzKZBi7vWOP3vgZB5w8vZBOaqXJUmfqJB9tZAxaayJITNB78WPmZBFZCkqNMqAZA8mYC6kUhklMx1Ny0UdAZBgPThbfmfnFIZD'; // Replace with your Facebook access token
      const response = await fetch(
        `https://graph.facebook.com/v13.0/127717720422053/feed?access_token=${accessToken}&fields=message,attachments&limit=1`
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

<View>
 {facebookFeed ? (
   facebookFeed.data.map((post, index) => (
     <Card key={index} style={styles.card2}>
       <Card.Title title="Announcement" />
       <Card.Content>
                      {post.attachments && post.attachments.data[0] && (
                        <>
                          {post.attachments.data[0].media && (
                            <Image
                              source={{ uri: post.attachments.data[0].media.image.src }}
                              style={styles.image} 
                            />
                          )}
                          {post.message && (
                            <Text style={styles.messageText}>{post.message}</Text>
                          )}
                          {post.attachments.data[0].target && (
                            <Text style={styles.linkText}>
                              <Button mode="contained" onPress={() => Linking.openURL(post.attachments.data[0].target.url)}>
                                View Post
                              </Button>
                            </Text>
                          )}
                        </>
                      )}
                    </Card.Content>
     </Card>
   ))
 ) : (
<Card style={styles.card2}>
  <Card.Title title="Announcement" />
  <Card.Content style={styles.centerContent}>
    <View style={styles.centerContent}>
      <Ionicons name="megaphone" size={40} color="green" />
      <Text style={styles.annStyle}>No Announcement found, Please check you internet connection</Text>
    </View>
  </Card.Content>
</Card>
  
 )}
</View>
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
    padding: '5%',
  },
  userName: {
    marginLeft: '5%',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    margin: '5%',
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
  },
  card2: {
    margin: '5%',
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#FFFFFF',
    marginBottom: '70%',
  },
  image: {
    width: '100%',
    height: '20%', 
  },
  messageText: {
    marginTop: '2%',
    fontSize: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  annStyle:{
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
 });
 

export default Home;
