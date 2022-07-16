import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import Startup from './src/screens/Startup';
import SignupProfile from './src/screens/SignupProfile';
import SignupID from './src/screens/SignupID';
import InitialLoad from './src/screens/InitialLoad';
import { Provider as UserProvider } from './src/context/userContext';
import Profile from './src/screens/Profile';

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="InitialLoad" 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="InitialLoad" component={InitialLoad} />
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="SignupProfile" component={SignupProfile} />
        <Stack.Screen name="SignupID" component={SignupID} />
        <Stack.Screen name="Profile" component={Profile} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;