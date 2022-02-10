import React, { useState } from "react";
import Login from './screens/login';
import CreateUser from './screens/createUser';
import Splash from './screens/splash';
import MyTabs from './customNavigation/myTabs';
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context/context";


// const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused}) => {
//         let iconName;

//         if (route.name === 'Home') {
//           iconName = "home"
//           return <Entypo name={iconName} size={24} color="black" />; // Her hadde React Navigation en finere kode. Sjekk ut den når du er blitt litt smartere i react native
//         } else if (route.name === 'Profile') {
//           return <MaterialCommunityIcons name="account" size={24} color="black" />
//         } else if (route.name === 'Inbox') {
//           return <Entypo name="inbox" size={24} color="black" />
//         } else if (route.name === 'Privacy') {
//           // Denne er midlertidig fordi login ikke skal være inne i hovedinnholdet
//           return <Entypo name="bug" size={24} color="black" />
//         }
//       },
//       tabBarActiveTintColor: 'tomato',
//       tabBarInactiveTintColor: 'gray',
//     })}>
//       <Tab.Screen name="Home" component={FeedNest} options={{headerShown: false}}/>
//       <Tab.Screen name="Privacy" component={ControlNest} options={{headerShown: false}}/>
//       <Tab.Screen name="Inbox" component={InboxNest} options={{headerShown: false}}/>
//       <Tab.Screen name="Profile" component={Profile} />
//     </Tab.Navigator>
//   );
// }

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
            <Stack.Screen name="Login" component={Login}/> 
            <Stack.Screen name="CreateUser" component={CreateUser}/> 
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
