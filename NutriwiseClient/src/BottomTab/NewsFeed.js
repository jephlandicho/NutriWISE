import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  StyleSheet,
  Platform,
  Button
} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('health');
  const [noArticlesMessage, setNoArticlesMessage] = useState('');

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual NewsAPI key.
    const apiKey = 'a3e0775455ea4832b4508e0c4847f5a8';

    // Replace 'YOUR_API_ENDPOINT' with the NewsAPI endpoint for Philippines health news.
    const apiEndpoint = `https://newsapi.org/v2/top-headlines?country=ph&category=${category}&apiKey=${apiKey}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        setNewsData(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
        setLoading(false);
      });
  }, [category]);


  const openArticleInBrowser = (url) => {
    Linking.openURL(url);
  };

  const openGoogleCSE = () => {
    const googleCSEURL = 'https://cse.google.com/cse?cx=6167d2f37f6ba4cd2';
    Linking.openURL(googleCSEURL);
  };

  const handleSearch = () => {
    setLoading(true);

    if (!searchQuery) {
      // If search query is empty, set the category back to 'health'.
      setCategory('health');
      setLoading(false);
      return;
    }

    // Perform a new API request based on the searchQuery.
    const apiKey = 'a3e0775455ea4832b4508e0c4847f5a8';
    const apiEndpoint = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        if (response.data.articles.length === 0) {
          setNoArticlesMessage('No articles/news related to your search.');
        } else {
          setNoArticlesMessage('');
        }
        setNewsData(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news data:', error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news/article"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={() => openGoogleCSE()}>
            <Text style={styles.cantfind}>
            Can't find anything?
            </Text>
        </TouchableOpacity>
      {noArticlesMessage ? (
        <Text style={styles.noArticlesMessage}>{noArticlesMessage}</Text>
      ) : (
        <FlatList
          data={newsData}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openArticleInBrowser(item.url)}>
              <Card style={styles.newsCard}>
                <Card.Cover source={{ uri: item.urlToImage }} />
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 30 : 40, // Adjust top padding for iOS status bar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
    width: '100%',
  },
  newsCard: {
    marginBottom: 16,
  },
  noArticlesMessage: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  cantfind:{
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default NewsFeed;