import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';
import { authentication, db } from '../Firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getDoc, doc, updateDoc, getDocs, collection} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Settings({navigation}){
     //sign out user
     const signoutUser = () => {
        signOut(authentication)
        .then((re) => {
        })
        .catch((re) => {console.log("failed to sign out")})
    };

    // Signout user and navigate to login screen
    const navigateHome = () => {
        signoutUser();
        navigation.navigate('Login')
    }


    // Update Users score data in firestore Database
    const updateUserScore = async (thisscore) => {
        const currentUser = authentication.currentUser;
        const docRef = doc(db, 'Users', currentUser.email);
        await updateDoc(docRef, {'Score': thisscore})
        .then((result) => {
            console.log("Updated Score")
            navigateHome();
        })
        .catch((result) => {console.log("Failed to update score")})
    }

    // Get users data from localstorage
    const getUsesScoreData = async () =>{
      
        try{
            const localScore = await AsyncStorage.getItem('score');
            console.log(localScore)
            if (localScore !== null){
                const currentScore = parseInt(localScore);
                // Update users score data to firestore
                updateUserScore(currentScore);
            }
        }
        catch(error){console.log("failed")};
    }


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={getUsesScoreData}>
                <Text style={styles.ButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}