import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Alert, TextInput, Text, View, Button, LogBox, ImageBackground, Image, TouchableOpacity, Dimensions} from 'react-native';
import styles from '../Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication, db } from '../Firebase-config';
import { getDoc, doc, updateDoc, addDoc, setDoc, collection, getDocs} from 'firebase/firestore';
import allButtons from '../AllButtons';

export default function Buttons({navigation}){


    const [buttons, setButtons] = useState(allButtons);

    // Alert messages if person doesnt have enough coins
    const buttonAlert = (balance) =>
    Alert.alert(
      "Not enough Tapcoins!",
      "Current balance: " + balance,
      [
       
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    
    // Init fucntion for buying a button
    const buyButton = async (thisPrice, id) => {
        getData(thisPrice, id);            
    }

   // Get data stored locally
   const getData = async (Price1, id) => {
    try{
        const localScore = await AsyncStorage.getItem('score');
        if (localScore !== null){ 
            const currentScore = parseInt(localScore);

            //Store new data locally
            storeData(currentScore, Price1, id);
            console.log("Current Score " + currentScore);

            }
        }
    catch (error){console.log(error)};
    }


  // Store Username and users score locally
  const storeData = async (count1, Price1, id) => {
    const newScore = count1 - Price1 // Set the new users balance

    // If balance is under 0, the user doesnt have enough money. Then send an alert message
    if(newScore < 0){
        buttonAlert(count1)
        return
    };

    // If user has enough coins, store the new balance
    const scoreData = JSON.stringify(newScore);
    try { 
        await AsyncStorage.setItem('score', scoreData)
        .then(() => {
            console.log("Button Bought")

            //Update the users score in firebase
            updateUserScore(newScore, id);
        })

        } catch (error) {console.log(error)};

    }



     // Update Users score in firestore Database
     const updateUserScore = async (thisscore, id) => {
        const currentUser = authentication.currentUser;
        const docRef = doc(db, 'Users', currentUser.email);
        await updateDoc(docRef, {'Score': thisscore})
        //Add the newly bought button to users firestore
        .then((result) => {addButtonToFirestore(id)})
        .catch((result) => {console.log("Failed to update score")})
    }

    

    // Add Button to firestore
    const addButtonToFirestore = async (id) => {
        const currentUser = authentication.currentUser;
        const docRef = doc(db, 'Users', currentUser.email, "Buttons", id)
        await setDoc(docRef , {'Id': id, 'Owned': true })
        //Update allbuttons file
        .then(() => {
            console.log("Button added to firestore");
            allButtons.forEach(element => {
                if(element.id === id){
                    element.owned = true;
                    
                }
                
            });
        })
        //Update page
        .then(() => {
            setButtons(allButtons.map((doc) => ({...doc})));
            console.log(buttons)
        })
        .catch(() => console.log("Failed to add button to firestore"))
    }



    //Setting new button to local storage
    const setNewButton = async (id) => {
        const newButton = JSON.stringify(id);
        await AsyncStorage.setItem('Button', newButton)
        .then(() => console.log("New button added locally"))
        .catch(() => console.log("Failed to add button locally"))
    }


  

    return(
        <View style={styles.container}>
            
            <View style={butStyles.top}>
            <ScrollView>
            {buttons.map(element => {
                return(
                    <View key={element.id}  style={butStyles.top}>
                        {element.owned === false?
                        <Text style={{fontSize: 18, color: 'white'}}>Price: {element.price} TC</Text>
                        :
                        <Text style={{fontSize: 18, color: 'white'}}>Owned</Text>
                        }

                        <View style={{alignItems: 'center', justifyContent: 'center'}}> 
                        <Image source={element.name} style={{width: element.width, height: element.height}}/>
                        {element.owned === false?
                        <TouchableOpacity style={butStyles.ButtonContainer} onPress={() => {buyButton(element.price, element.id)}}>
                            <Text style={styles.ButtonText}>Buy</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity  style={butStyles.ButtonContainer} onPress={() => {setNewButton(element.id)}}>
                            <Text style={styles.ButtonText}>Use</Text>
                        </TouchableOpacity>
                        }
                        </View>


                       
                    </View>
                )
            })}
            </ScrollView>
            </View>

        </View>
    )
}


const butStyles = StyleSheet.create({
    top: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    bot: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        height: 300,
        flexDirection: 'row', 
    },
    ButtonContainer: {
        elevation: 4,
        backgroundColor: "#f0e68c",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 100
       
      },
})