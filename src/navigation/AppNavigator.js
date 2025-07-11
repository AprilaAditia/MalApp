import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Summer Anime 2025' }} 
      />
      <Stack.Screen 
        name="Detail" 
        component={DetailScreen} 
        options={{ title: 'Anime Detail' }} 
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoriteScreen} 
        options={{ title: 'My Favorites' }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
