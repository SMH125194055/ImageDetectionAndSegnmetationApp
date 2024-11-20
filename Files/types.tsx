// types.ts
// types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    index: undefined;
    ImagePreview: { uri: string };
    ProcessingScreen: { uri: string }; // Add ProcessingScreen with a uri parameter
  };

  
// Optionally, define prop types for better type safety in components
export type ImagePreviewRouteProp = RouteProp<RootStackParamList, 'ImagePreview'>;
export type IndexScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;