import React, {useState, useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, Button, LogBox} from 'react-native';
//import Navigator from './Stacknavigator';
import { authentication } from './Firebase-config';
import { onAuthStateChanged, signOut} from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from './pages/Game';
import Login from './pages/Login';
import Leaderboard from './pages/Leaderboard';
import Buttons from './pages/Buttons';


LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['AsyncStorage has been extracted'])



const Stack = createNativeStackNavigator();

export default function App() {

  signOut(authentication);

  onAuthStateChanged(authentication, (user) => {
    if(user){
      console.log("logged in");
    }
    else{console.log("not logged inn")}
  });



  return(  
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
        <Stack.Screen name="Buttons" component={Buttons} />

      </Stack.Navigator>
    </NavigationContainer>
  )

};

