import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ImagePreview from '../Files/ImagePreview';
import Index from '../Files/index';
import ProcessingScreen from '../Files/ProcessingScreen';
import { RootStackParamList } from '../Files/types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="index" >
        <Stack.Screen name="index" component={Index} />
        <Stack.Screen name="ImagePreview" component={ImagePreview} />
        <Stack.Screen name="ProcessingScreen" component={ProcessingScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}