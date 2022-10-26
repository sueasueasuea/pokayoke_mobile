import 'react-native-gesture-handler';
import React from 'react'
import LoginByNFC from './src/pages/LoginByNFC'
import LoginByID from './src/pages/LoginByID'
import History from './src/pages/History'
import Home from './src/pages/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TokenContextProvider from './src/store/TokenContext';
import LoadingContextProvider from './src/store/LoadingContext';
import AuthContextProvider from './src/store/AuthContext';

const Stack = createStackNavigator();

export default function App() {


  return (
    <TokenContextProvider>
      <LoadingContextProvider>
        <AuthContextProvider>
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
        </AuthContextProvider>
      </LoadingContextProvider>
    </TokenContextProvider>

  )
}

