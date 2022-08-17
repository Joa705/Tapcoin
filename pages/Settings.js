import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';
import {db, authentication} from '../Firebase-config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getDoc, doc, updateDoc, getDocs, collection, setDoc, addDoc} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Settings({navigation}){

  

    // Signout user and navigate to login screen
    const navigateHome = async () => {
      
        await AsyncStorage.getItem('score') // Get users current score from locastorage 
        .then((res) => {
            const result = parseInt(res)

            const currentUser = authentication.currentUser;
            const docRef = doc(db, 'Users', currentUser.email);
            updateDoc(docRef, {'Score': result}) // Update score to firestore
            .then(() => {
                signOut(authentication) // Sign out the current user
                navigation.navigate('Login') // Navigate to the Login page
            })
            .catch((err) => console.log(err))
    
        })
        .catch((err) => console.log(err))
       


    }   



    // Update Users score data in firestore Database
    const updateUserScore = async (thisscore) => {

    }
      


 


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={navigateHome}>
                <Text style={styles.ButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}