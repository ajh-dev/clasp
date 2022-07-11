import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator } from "@react-navigation/native-stack";
import Startup from './src/screens/Startup';
import SignupProfile from './src/screens/SignupProfile';
import SignupID from './src/screens/SignupID';

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Startup" 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Startup" component={Startup} />
        <Stack.Screen name="SignupProfile" component={SignupProfile} />
        <Stack.Screen name="SignupID" component={SignupID} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;