import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';
import {signoutUser, updateUserScore} from '../functions/Firebase'
import {getUsesScoreData} from '../functions/LocalStorage'
import {db, authentication} from '../Firebase-config'


export default function Settings({navigation}){

  

    // Signout user and navigate to login screen
    const navigateHome = () => {
      
        getUsesScoreData() // Get users current score from locastorage 
        .then((res) => {
        })
        .catch((err) => console.log(err))

        
        updateUserScore(5000) // Update score to firestore
        .then(() => {
            signoutUser(); // Sign out the current user
            navigation.navigate('Login') // Navigate to the Login page
        })
        .catch((err) => console.log(err))


    }   



    const redirectuser = () => {
        console.log(authentication.currentUser.email)
        signoutUser()
        navigation.navigate('Login')
    }
 


    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={navigateHome}>
                <Text style={styles.ButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}