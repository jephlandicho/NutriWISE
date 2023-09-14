import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Linking,Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Materials = () => {
  const route = useRoute();
  const { material } = route.params;
  const fileExtension = material.split('.').pop().toLowerCase();

  const openFileInDefaultViewer = () => {
    const fileUrl = `https://nutriwise.website/Prof/uploadedfiles/${material}`;

    Linking.openURL(fileUrl).catch((err) => {
      console.error('Error opening URL:', err);
    });
  };

  const webViewJavaScript = `
    // JavaScript code to zoom in (adjust the zoom level as needed)
    var viewport = document.querySelector('meta[name="viewport"]');
    viewport.content = "width=device-width, initial-scale=2.0, maximum-scale=2.0, user-scalable=yes";
  `;

  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>{material}</Text>
          <TouchableOpacity onPress={openFileInDefaultViewer}>
            <Ionicons name="md-download-outline" size={25} color='black'/>
          </TouchableOpacity>
        </View>
        {fileExtension !== 'jpg' && fileExtension !== 'jpeg' && fileExtension !== 'png' ? (
          <WebView
            source={{
              uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=https://nutriwise.website/Prof/uploadedfiles/${material}`,
            }}
            injectedJavaScript={webViewJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={false}
          />
        ) : (
          <View style={{ flex: 1 }}>
            <Image
              style={{ flex: 1, resizeMode: 'contain' }}
              source={{
                uri: `https://nutriwise.website/Prof/uploadedfiles/${material}`,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: '20%'
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Materials;
