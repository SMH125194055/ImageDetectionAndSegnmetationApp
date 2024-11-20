import { useRoute } from "@react-navigation/native";
import * as ImageManipulator from 'expo-image-manipulator';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from "react-native";
import axios from 'axios';

export default function ProcessingScreen() {
  const route = useRoute();
  const { uri } = route.params;
  const [processedUri, setProcessedUri] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processImage = async () => {
      try {
        setIsLoading(true);
        console.log("Processing image...1");
        // Preprocess the image
        // const manipResult = await preprocessImage(uri);
        console.log("send Image to Api...2");
        // Send the image to the API using FormData
        // const response = await sendImageToApi(uri);
        const response = await uploadImage(uri);
        // console.log("Image Processed Successfully");
        console.log("Bahir Wala",response);
        setProcessedUri(response);
        // Assuming the API returns a processed image in base64 format
        if (response && response.image) {
          // setProcessedUri(`data:image/jpeg;base64,${response.processedImage}`);
          console.log("Heloo Welcome to the world of React Native\n\n\n\n");
          setProcessedUri(response);
          console.log(processedUri);

        } else {
          Alert.alert("Error", "No processed image received from server");
        }
      } catch (error) {
        console.error("Error processing image:", error);
        Alert.alert("Error", "Failed to process image");
      } finally {
        setIsLoading(false);
      }
    };

    processImage();
  }, [uri]);

 const uploadImage = async (uri) => {
    if (!uri) {
      Alert.alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg', // or the appropriate mime type
      name: 'image.jpg',
    });

    try {
      const response = await axios.post('https://ai-based-diabetic-patient-management.onrender.com/detect/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from FastAPI:', response);
      const result = response.data;
      const result2 = `data:image/jpeg;base64,${result.image}`;
      console.log('\n\n\n\n\n\n\n\n\n\nAPI Response: result2', result2);
      return result2;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Something went wrong with the upload.');
    }
  };


  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : processedUri ? (
        <Image source={{ uri: processedUri }} style={styles.image} />
      ) : (
        <View><Text>No Image Processed</Text></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "contain",
  },
});



/*
import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg', // or the appropriate mime type
      name: 'image.jpg',
    });

    try {
      const response = await axios.post('http://192.168.0.103:8000/detect/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response from FastAPI:', response.data);
      // Handle the response here, like showing the processed image
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Something went wrong with the upload.');
    }
  };

  return (
    <View>
      <Button title="Pick an image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default ImageUpload;

*/