import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import ChannelsListScreen from './screens/ChannelsListScreen'
import GroupsListScreen from './screens/GroupsListScreen'
import CreateNewGroupScreen from './screens/CreateNewGroupScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Groups() {
  return (
    <Stack.Navigator initialRouteName="Groups list">
      <Stack.Screen name="Groups list" component={GroupsListScreen}/>
      <Stack.Screen name="New group" component={CreateNewGroupScreen}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Channels">
        <Drawer.Screen name="Channels" component={ChannelsListScreen}/>
        <Drawer.Screen name="Groups" component={Groups}/>
        {/* <Drawer.Screen name="Groups" component={GroupsListScreen}/> */}
      </Drawer.Navigator>
    </NavigationContainer>
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
