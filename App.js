import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'

import ChannelsListScreen from './screens/ChannelsListScreen'
import GroupsListScreen from './screens/GroupsListScreen'
import CreateNewGroupScreen from './screens/CreateNewGroupScreen';
import ChooseGroupScreen from './screens/ChooseGroupScreen'
import GroupVideosScreen from './screens/GroupVideosScreen'
import AuthenticateScreen from './screens/AuthenticateScreen'
import { useState } from 'react';
import { useEffect } from 'react';

const Drawer = createDrawerNavigator();
const GroupsStack = createStackNavigator();
const ChannelsStack = createStackNavigator();

function Groups() {
  return (
    <GroupsStack.Navigator initialRouteName="Groups list">
      <GroupsStack.Screen name="Groups list" component={GroupsListScreen} />
      <GroupsStack.Screen name="Group videos" component={GroupVideosScreen} />
      <GroupsStack.Screen name="New group" component={CreateNewGroupScreen} />
    </GroupsStack.Navigator>
  )
}

function Channels() {
  return (
    <ChannelsStack.Navigator initialRouteName="Channels list">
      <ChannelsStack.Screen name="Choose group" component={ChooseGroupScreen} />
      <ChannelsStack.Screen name="Channels list" component={ChannelsListScreen} />
    </ChannelsStack.Navigator>
  )
}

const IsAuthenticated = async () => {
  let authToken = await SecureStore.getItemAsync('auth_token');
  if (authToken) {
      console.log("auth token is true");
    } else {
      console.log("auth token is false");
    }
  return authToken;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    IsAuthenticated()
      .then((result) => {setIsAuthenticated(result)})
      .catch(err => console.log(err));
  }, []);

  return (
    <PaperProvider>
      {
        isAuthenticated 
        ? <NavigationContainer>
          <Drawer.Navigator initialRouteName="Channels">
            {/* <Drawer.Screen name="Channels" component={ChannelsListScreen}/> */}
            <Drawer.Screen name="Channels" component={Channels} />
            <Drawer.Screen name="Groups" component={Groups} />
          </Drawer.Navigator>
          </NavigationContainer>
        : <AuthenticateScreen/>
      }
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
