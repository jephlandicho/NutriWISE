import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, FlatList, Linking, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Provider as PaperProvider, DataTable,Divider } from 'react-native-paper';
import MyTheme from '../Components/MyTheme';
import PDFIcon from '../Images/pdf.png';
import DocumentIcon from '../Images/docu.png';
import ImageIcon from '../Images/image.png';
import MaterialIcon from '../Images/book.png';
import LinkIcon from '../Images/web.png';

const Stream = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classID } = route.params;
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5,6,7]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const [classStreams, setClassStreams] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);

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
          setExpandedCards(Array(data.classStreams.length).fill(false));
        } else {
          Alert.alert('No post yet', 'Wait for your instructor to post something.');
        }
      })
      .catch((error) => console.error(error));
  }, [classID]);

  const handleView = (material) => {
    navigation.navigate('Materials', { material });
  };

  const toggleCardExpansion = (index) => {
    const newExpandedCards = [...expandedCards];
    newExpandedCards[index] = !newExpandedCards[index];
    setExpandedCards(newExpandedCards);
  };

  const dynamicPagination = (array, page, itemsPerPage) => {
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;

    if (array.length <= itemsPerPage) {
      return array;
    } else {
      if (expandedCards.includes(true)) {
        // If any card is expanded, display only 3 cards at a time
        return array.slice(start, start + 3);
      } else {
        return array.slice(start, end);
      }
    }
  };

  return (
    <PaperProvider theme={MyTheme}>
      <ScrollView style={styles.container1}>
        <View style={styles.container}>
          {dynamicPagination(classStreams, page, itemsPerPage).map((classStream, index) => (
            <View key={classStream.id}>
            <Card  style={styles.card}>
              <TouchableOpacity onPress={() => toggleCardExpansion(index)}>
                <Card.Content>
                  {classStream.title && (
                    <View style={styles.cardFront}>
                      <Image source={MaterialIcon} style={styles.materialIcon} />
                      <Title style={styles.cardTitle}>{classStream.title}</Title>
                    </View>
                  )}
                  {expandedCards[index] && classStream.description && (
                    <Paragraph style={styles.cardDescription}>{classStream.description}</Paragraph>
                  )}
                  {expandedCards[index] && classStream.links && (
                    <TouchableOpacity onPress={() => openFileInDefaultViewer(classStream.links)}>
                      <View style={styles.linkstyle}>
                      <Image source={LinkIcon} style={styles.linkIcon} />
                      <Paragraph style={styles.cardlinks}>{classStream.links}</Paragraph>
                      </View>
                      
                    </TouchableOpacity>
                  )}

                  {expandedCards[index] && classStream.materials && classStream.materials.length > 0 ? (
                    <FlatList
                      data={classStream.materials}
                      horizontal
                      keyExtractor={(material, materialIndex) => materialIndex.toString()}
                      renderItem={({ item, materialIndex }) => (
                        <TouchableOpacity onPress={() => handleView(item)}>
                          <View style={styles.materialContainer}>
                            {item.endsWith('.pdf') ? (
                              <Image source={PDFIcon} style={styles.materialIcon} />
                            ) : item.endsWith('.doc') || item.endsWith('.docx') || item.endsWith('.txt') ? (
                              <Image source={DocumentIcon} style={styles.materialIcon} />
                            ) : item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg') ? (
                              <Image source={ImageIcon} style={styles.materialIcon} />
                            ) : null}
                            <Paragraph style={styles.materialName}>{item}</Paragraph>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </Card.Content>
              </TouchableOpacity>
            </Card>
            {index < classStreams.length - 1 && <Divider />}
            </View>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(classStreams.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${page * itemsPerPage + 1}-${Math.min((page + 1) * itemsPerPage, classStreams.length)} of ${classStreams.length}`}
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
    paddingBottom: '30%',
  },
  container1: {
    backgroundColor: '#fff',

  },
  card: {
    marginVertical: 10 ,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  cardFront: {
    flexDirection: 'row',
  },
  linkstyle:{
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 18,
    marginVertical: 10,
  },
  cardlinks: {
    fontSize: 20,
    color: '#0000EE',
    marginBottom: 10,
  },
  noPostText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  materialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 3,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  materialIcon: {
    width: 25,
    height: 25,
    marginRight: 8,
  },
  linkIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  materialName: {
    fontSize: 18,
  },
});

export default Stream;
