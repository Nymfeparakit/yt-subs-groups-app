import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import ChannelsListScreen from './screens/ChannelsListScreen'
import GroupsListScreen from './screens/GroupsListScreen'
import CreateNewGroupScreen from './screens/CreateNewGroupScreen';
import ChooseGroupScreen from './screens/ChooseGroupScreen'

const Drawer = createDrawerNavigator();
const GroupsStack = createStackNavigator();
const ChannelsStack = createStackNavigator(); 

function Groups() {
  return (
    <GroupsStack.Navigator initialRouteName="Groups list">
      <GroupsStack.Screen name="Groups list" component={GroupsListScreen}/>
      <GroupsStack.Screen name="New group" component={CreateNewGroupScreen}/>
    </GroupsStack.Navigator>
  )
}

function Channels() {
  return (
    <ChannelsStack.Navigator initialRouteName="Channels list">
      <ChannelsStack.Screen name="Choose group" component={ChooseGroupScreen}/>
      <ChannelsStack.Screen name="Channels list" component={ChannelsListScreen}/>
    </ChannelsStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Channels">
        {/* <Drawer.Screen name="Channels" component={ChannelsListScreen}/> */}
        <Drawer.Screen name="Channels" component={Channels}/>
        <Drawer.Screen name="Groups" component={Groups}/>
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
