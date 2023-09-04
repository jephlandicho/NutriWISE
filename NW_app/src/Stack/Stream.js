import { View, Text, StyleSheet, ScrollView,Alert, FlatList,Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation,useIsFocused  } from '@react-navigation/native';
import { Card, Title, Paragraph, Provider as PaperProvider, DataTable} from 'react-native-paper';
import MyTheme from '../Components/MyTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stream = () => {
    const navigation = useNavigation();
  const route = useRoute();
  const { classID } = route.params;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([3, 6, 8]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const [classStreams, setClassStreams] = useState([]);

  const openFileInDefaultViewer = (link) => {
    const fileUrl = link;

    Linking.openURL(fileUrl).catch((err) => {
      console.error('Error opening URL:', err);
    });
  };

  useEffect(() => {
    fetch(`https://nutriwise.website/api/stream.php?classID=${classID}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setClassStreams(data.classStreams);
          console.log(data.classStreams);
        } else {
        Alert.alert('No post yet', 'Wait for your instructor to post something.');
        //   console.error(data.message);
        }
      })
      .catch((error) => console.error(error));
  }, [classID]);

  const handleView = (material) => {
    console.log(material)
    navigation.navigate('Materials', { material });
  };

  const from = page * itemsPerPage;
  const to = from + itemsPerPage;
  const displayedData = classStreams.slice(from, to);
  return (
    <PaperProvider theme={MyTheme}>
    <ScrollView style={styles.container1}> 
    <View style={styles.container}>
      {displayedData.length > 0 ? (
        displayedData.map((classStream) => (
          <Card key={classStream.id} style={styles.card}>
            <Card.Content>
              <Title style={styles.cardTitle}>{classStream.title}</Title>
              <Paragraph>{classStream.description}</Paragraph>
              <TouchableOpacity onPress={() => openFileInDefaultViewer(classStream.links)}>
                <Paragraph>{classStream.links}</Paragraph>
              </TouchableOpacity>
              
              {classStream.materials.length > 0 ? (
                classStream.materials.map((material, index) => (
                  <TouchableOpacity key={index} onPress={() => handleView(material)}>
                    <Paragraph>{material}</Paragraph>
                    {console.log(classStream.materials)}
                  </TouchableOpacity>
                ))
              ) : (
                <Text>No materials available</Text>
              )}
              {/* Display other classStream properties as needed */}
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.noPostText}>No posts yet.</Text>
      )}
      <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(classStreams.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${Math.min((page + 1) * itemsPerPage, classStreams.length)} of ${
            classStreams.length
          }`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          selectPageDropdownLabel={'Rows per page'}
        />
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
