import React, { useState } from "react";
import Profile from '../screens/profile';
import FeedNest from '../customNavigation/feedNest';
import InboxNest from '../customNavigation/inboxNest';
import ControlNest from '../customNavigation/controlNest';
import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
  TouchableOpacity,
} from 'react-native';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
    ? route.state.routes[route.state.index].name
    : '';

    if( routeName === 'Chat') {
      return false;
    }
    return true;
  }

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = "home"
          return <Entypo name={iconName} size={24} color="black" />; // Her hadde React Navigation en finere kode. Sjekk ut den når du er blitt litt smartere i react native
        } else if (route.name === 'Profile') {
          return <MaterialCommunityIcons name="account" size={24} color="black" />
        } else if (route.name === 'Inbox') {
          return <Entypo name="inbox" size={24} color="black" />
        } else if (route.name === 'Privacy') {
          // Denne er midlertidig fordi login ikke skal være inne i hovedinnholdet
          return <Entypo name="bug" size={24} color="black" />
        }
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={FeedNest} options={{headerShown: false}}/>
      <Tab.Screen name="Privacy" component={ControlNest} options={{headerShown: false}}/>
      <Tab.Screen name="Inbox" component={InboxNest} options={({route}) => ({
        // tabBarVisible: false fungerer jo fanden ikke jo!!
        // React native anbefaler heller å putte tab navigatoren inne i stack navigatoren, men det kan jeg fikse en senere gang tenker jeg
        headerShown: false
        })}/>
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}