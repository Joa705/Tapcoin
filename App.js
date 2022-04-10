import React, {useState, useEffect} from 'react'
import {ImageBackground, StyleSheet, TextInput, Text, View, Button, LogBox} from 'react-native';
import { authentication } from './Firebase-config';
import { onAuthStateChanged, signOut} from "firebase/auth";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Game from './pages/Game';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import Buttons from './pages/Buttons';
import Settings from './pages/Settings';



LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted'])


const bottombar = createBottomTabNavigator()

function SettinBottomBar() {
  return(
    <bottombar.Navigator initialRouteName='GameBar' 
    screenOptions={{headerShown: false, tabBarActiveTintColor: '#f0e68c'}}>


      <bottombar.Screen name="Gamezone" component={Game} 
        options={{
          tabBarLabel: 'Game',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="controller-classic" color={color} size={26} />
          ),
        }}
        />

      <bottombar.Screen  name="Leaderboard" component={Leaderboard} 
      options={{
        tabBarLabel: 'Leaderboard',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="numeric-1-circle" color={color} size={26} />
        ),
      }}
      />

      <bottombar.Screen  name="Buttons" component={Buttons}
      options={{
        tabBarLabel: 'Store',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" color={color} size={26} />
        ),
      }}
      />

      <bottombar.Screen  name="Settings" component={Settings}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cog" color={color} size={26} />
        ),
      }}
      />

    </bottombar.Navigator>    
  )
};




const Stack = createNativeStackNavigator();

export default function App() {

  signOut(authentication);

  onAuthStateChanged(authentication, (user) => {
    if(user){
      console.log("logged in");
    }
    else{console.log("not logged inn")}
  });

  const backgroundImage = require('./ButtonImage/YellowStripeBackground.jpg')

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return( 
    <>
    <ImageBackground source={backgroundImage} resizeMode="cover" style={appStyle.background}>

    <NavigationContainer theme={navTheme}>

      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Game" component={SettinBottomBar} />  
      </Stack.Navigator>

    </NavigationContainer>
    </ImageBackground>

    </>
  )

};

const appStyle = StyleSheet.create({
  background: {
    flex:1,
    justifyContent: "center",
  
  }
})