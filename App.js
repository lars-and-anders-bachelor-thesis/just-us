import React, { useState } from "react";
import Login from './frontend/screens/login';
import CreateUser from './frontend/screens/createUser';
import Splash from './frontend/screens/splash';
import MyTabs from './frontend/customNavigation/myTabs';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./frontend/context/context";

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
  }, []); // loading-animasjon som jeg er litt usikker på om fungerer. Trengs å sjekke litt mer her ja

  if (isLoading) {
    return <Splash />;
  }

  return ( // lese seg opp på React Context, har ikke forstått det 100%. Edit: jeg forstod etter å ha tenkt på det når jeg lå på sofaen hos karolina
    <AuthContext.Provider value={authContext}>  
      <NavigationContainer>
        { userToken ? (
          <MyTabs />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> 
            <Stack.Screen name="CreateUser" component={CreateUser}/> 
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
