import React, { useState } from "react";
import Login from './screens/login';
import Feed from './screens/feed';
import Profile from './screens/profile';
import Inbox from './screens/inbox';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Oinky" component={Login} />
      <Tab.Screen name="Home" component={Feed} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}