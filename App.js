import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Startup from "./src/screens/Startup";
import SignupProfile from "./src/screens/SignupProfile";
import SignupID from "./src/screens/SignupID";
import Profile from "./src/screens/Profile";
import Home from "./src/screens/Home";
import Message from "./src/screens/Message";
import InitialLoad from "./src/screens/InitialLoad";
import { Provider as UserProvider } from "./src/context/userContext";
import { Provider as MessageProvider } from "./src/context/messageContext";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserProvider>
      <MessageProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="InitialLoad"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="InitialLoad" component={InitialLoad} />
            <Stack.Screen name="Startup" component={Startup} />
            <Stack.Screen name="SignupProfile" component={SignupProfile} />
            <Stack.Screen name="SignupID" component={SignupID} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Message" component={Message} />
          </Stack.Navigator>
        </NavigationContainer>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
