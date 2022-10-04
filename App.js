import 'react-native-gesture-handler';
import { View, Text } from 'react-native'
import React from 'react'
import LoginByNFC from './src/pages/LoginByNFC'
import LoginByID from './src/pages/LoginByID'
import History from './src/pages/History'
import Home from './src/pages/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginByNFC"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginByNFC" component={LoginByNFC} />
          <Stack.Screen name="LoginByID" component={LoginByID} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="History" component={History} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

