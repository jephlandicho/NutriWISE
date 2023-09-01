import { View, Text, StyleSheet, ScrollView,Alert, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Card, Title, Paragraph, Provider as PaperProvider, } from 'react-native-paper';
import MyTheme from '../Components/MyTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stream = () => {
    const navigation = useNavigation();
  const route = useRoute();
  const { classID } = route.params;

  const [classStreams, setClassStreams] = useState([]);

  useEffect(() => {
    fetch(`https://nutriwise.website/api/stream.php?classID=${classID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setClassStreams(data.classStreams);
        } else {
        Alert.alert('No post yet', 'Wait for your instructor to post something.');
        //   console.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  }, [classID]);

  const handleView = (material) => {
    navigation.navigate('Materials', { material });
  };
  return (
    <PaperProvider theme={MyTheme}>
    <ScrollView style={styles.container1}> 
    <View style={styles.container}>
      {classStreams.length > 0 ? (
        classStreams.map((classStream) => (
          <Card key={classStream.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{classStream.description}</Title>
              <TouchableOpacity onPress={() => handleView(classStream.materials)}>
              <Paragraph>{classStream.materials}</Paragraph>
              </TouchableOpacity>
              {/* <WebView
                source={{ uri: `https://nutriwise.website/Prof/${classStream.materials}` }}
            /> */}
              {/* Display other classStream properties as needed */}
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.noPostText}>No posts yet.</Text>
      )}
    </View>
    </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container1: {
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    padding: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noPostText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
});

export default Stream;
