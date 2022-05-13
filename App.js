import React, { useState } from "react";
import Login from './frontend/screens/login';
import CreateUser from './frontend/screens/createUser';
import UserLogin from './frontend/screens/userLogin';
import Splash from './frontend/screens/splash';
import MyTabs from './frontend/customNavigation/myTabs';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./frontend/context/context";

import { LogBox } from "react-native";
LogBox.ignoreLogs([
  50000
]);

const Stack = createStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(false);

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setIsLoading(false);
        setUserToken('bleke');
      },
      signUp: () => {
        setIsLoading(false);
        setUserToken('bleke');
      },
      signOut: () => {
        setIsLoading(false);
        setUserToken(null);
      }
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return ( 
    <AuthContext.Provider value={authContext}>  
      <NavigationContainer>
        { userToken ? (
          <MyTabs />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> 
            <Stack.Screen name="CreateUser" component={CreateUser}/> 
            <Stack.Screen name="LoginUser" component={UserLogin}/> 
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
