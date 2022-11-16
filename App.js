import 'react-native-gesture-handler';
import React from 'react'
import LoginByNFC from './src/pages/LoginByNFC'
import LoginByID from './src/pages/LoginByID'
import History from './src/pages/History'
import Home from './src/pages/Home'

import SSChoice from './src/pages/SSChoice';
import Scanning from './src/pages/Scanning';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TokenContextProvider from './src/store/TokenContext';
import LoadingContextProvider from './src/store/LoadingContext';
import AuthContextProvider from './src/store/AuthContext';
import ChoiceContextProvider from './src/store/ChoiceContext';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <TokenContextProvider>
      <LoadingContextProvider>
        <AuthContextProvider>
          <ChoiceContextProvider>
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
                  <Stack.Screen name="Scanning Choice" component={SSChoice} />
                  <Stack.Screen name="Scanning" component={Scanning} />
                </Stack.Navigator>
              </NavigationContainer>

            </PaperProvider>
          </ChoiceContextProvider>
        </AuthContextProvider>
      </LoadingContextProvider>
    </TokenContextProvider>

  )
}

