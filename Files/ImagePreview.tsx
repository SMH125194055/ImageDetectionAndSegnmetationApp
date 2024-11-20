import { StyleSheet, View, Image, Button } from "react-native";
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type ImagePreviewRouteProp = RouteProp<RootStackParamList, 'ImagePreview'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'ImagePreview'>;

export default function ImagePreview() {
  const route = useRoute<ImagePreviewRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { uri } = route.params;

  const handleSendImage = () => {
    navigation.navigate('ProcessingScreen', { uri });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <Button title="Send Image" onPress={handleSendImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#00FF00',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});
