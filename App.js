import 'react-native-gesture-handler';
import React from 'react'
import LoginByNFC from './src/pages/LoginByNFC'
import LoginByID from './src/pages/LoginByID'
import History from './src/pages/History'
import Home from './src/pages/Home'
import BRChoice from './src/pages/BRChoice'
import SSChoice from './src/pages/SSChoice';
import Scanning from './src/pages/Scanning';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import TokenContextProvider from './src/store/TokenContext';
import LoadingContextProvider from './src/store/LoadingContext';
import AuthContextProvider from './src/store/AuthContext';
import ChoiceContextProvider from './src/store/ChoiceContext';

const Stack = createStackNavigator();

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
                  <Stack.Screen name="BRChoice" component={BRChoice} />
                  <Stack.Screen name="SSChoice" component={SSChoice} />
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

