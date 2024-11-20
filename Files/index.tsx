import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from './types'; // Adjust path if necessary

type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

export default function Index() {
  const navigation = useNavigation<IndexScreenNavigationProp>();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  // Handle camera permission states
  if (!permission) {
    return <View />; // Camera permissions are still loading.
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to pick an image from the gallery
  async function pickImageFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        // const manipulatedResult = await ImageManipulator.manipulateAsync(
        //   result.assets[0].uri,
        //   [{ resize: { width: 640, height: 640 } }],
        //   { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        // );
        console.log(result.assets[0].uri);
        navigation.navigate('ImagePreview', { uri: result.assets[0].uri });
      } catch (error) {
        console.error("Error manipulating image:", error);
        Alert.alert("Error", "Failed to manipulate the image.");
      }
    }
  }

  // Function to take a picture with the camera
  async function takePictureWithCamera() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        // const manipulatedResult = await ImageManipulator.manipulateAsync(
        //   result.assets[0].uri,
        //   [{ resize: { width: 640, height: 640 } }],
        //   { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        // );
        console.log(result.assets[0].uri);
        navigation.navigate('ImagePreview', { uri: result.assets[0].uri });
      } catch (error) {
        console.error("Error manipulating image:", error);
        Alert.alert("Error", "Failed to manipulate the image.");
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={pickImageFromGallery}
          >
            <Ionicons name="images-outline" size={30} color="black" />
            <Text style={styles.optionText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={takePictureWithCamera}
          >
            <Ionicons name="camera-outline" size={30} color="black" />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: '#00FF00',
  },
  optionsContainer: {
    flex: 1, // Takes the full height of the screen
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingVertical: 10,
    // position: 'absolute',
    alignItems: "center",
    // bottom: 0,
    
    width: '100%',
  },
  optionText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  iconButton: {
    alignItems: "center",
    padding: 10,
  },
});