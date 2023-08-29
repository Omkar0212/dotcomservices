import React from 'react';
import {Text, View} from 'react-native';
import MyStack from './src/screens/myStack';
import { NavigationContainer } from '@react-navigation/native';

const App = ({navigation}) => {
  return (
    
    <NavigationContainer>
    <MyStack/>
   </NavigationContainer>
  
  );
};
export default App;
