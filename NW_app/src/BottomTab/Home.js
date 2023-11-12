import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Linking, Image, Alert } from 'react-native';
import { Avatar, Card, Provider as PaperProvider, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../Components/MyTheme';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const db = SQLite.openDatabase('mydatabase.db');

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [facebookFeed, setFacebookFeed] = useState(null); // State for Facebook feed data

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
                ))}
              </View>
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
