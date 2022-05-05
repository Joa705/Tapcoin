import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, ImageBackground} from 'react-native';
import styles from '../Styles';
import { authentication, db } from '../Firebase-config';
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import AllButtons from '../AllButtons';

export default function Login({navigation}){

    const [createuser, setCreateuser] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('passord1');
    const [email, setEmail] = useState('jojo@hotmail.lele');



    // Navigate to game and set allbuttons to not owned
    const navigatoinhandler = () => {
        AllButtons.forEach(element => {
            if(element.id == 0){element.owned = true}
            else{
            element.owned = false;

            }
        });
        navigation.navigate('Game');
    }



    //Sign in to user account
    const signinUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((re) => {
            navigatoinhandler();
        })
        .catch((re) => {
            console.log("failed to login")
        })
    };


   

    //Register a new user account, then redirect to game page
    const registerUser = () => {
        createUserWithEmailAndPassword(authentication, email, password) // Register new user to firebase. 
        .then((re) =>{
             console.log("User registert");
             setDoc(doc(db, "Users", email), {Username: username,  Email: email, Score: 0}) // Create a document in firestore for that user. 
             .then((re) =>{
                setCreateuser(false); // Change the view
                navigatoinhandler(); // Navigate to the game page
             }).catch((re) => {console.log("failed to add user in firestore")})
             
            })
        .catch((re) => {console.log("Failed to register user")})
    };



    if(createuser){
        return(
            <View style={styles.container}>
           
            <View style={LoginStyle.top}>
                <Image source={require('../ButtonImage/GoldenLogo.png')} style={{width:300, height: 200}}/>
                <Text style={styles.logotext}>TapCoin</Text>

            </View>

            <View style={LoginStyle.mid}>
             <TextInput style={LoginStyle.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
             <TextInput style={LoginStyle.input} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
             <View style={{height:10}}></View>
             <TextInput style={LoginStyle.input} placeholder='Username' value={username} onChangeText={(text) => setUsername(text)}/>
             <View style={{height:10}}></View>
             <TouchableOpacity style={styles.ButtonContainer} onPress={registerUser}>
                 <Text style={styles.ButtonText}>Register</Text>
             </TouchableOpacity>
            </View>


            <View style={LoginStyle.bot}>
            <TouchableOpacity style={styles.ButtonContainer} onPress={() => setCreateuser(false)}>
                 <Text style={styles.ButtonText}>Login</Text>
             </TouchableOpacity>
            </View>
           
                

           
            </View>
        )
    }

    if(!createuser){
        return(
            <View style={styles.container}>
            
            <View style={LoginStyle.top}>
                <Image source={require('../ButtonImage/GoldenLogo.png')} style={{width:300, height: 200}}/>
                <Text style={styles.logotext}>TapCoin</Text>
            </View>

            <View style={LoginStyle.mid}>

            
            <TextInput style={LoginStyle.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
            <TextInput style={LoginStyle.input} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <View style={{height:10}}></View>
         

                <TouchableOpacity style={styles.ButtonContainer} onPress={signinUser}>
                    <Text style={styles.ButtonText}>Sign in</Text>
                </TouchableOpacity>
            <View style={{height:20}}></View>

            </View>
        
            
            <View style={LoginStyle.bot}>      
             <TouchableOpacity style={styles.ButtonContainer} onPress={() => setCreateuser(true)}>
                 <Text style={styles.ButtonText}>Register new account</Text>
             </TouchableOpacity>
            </View>
    

            </View>
        )
    }
    
}



const LoginStyle = StyleSheet.create({
    top: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
     
    },
    mid: {
        flex:2,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bot: {
        flex:1,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    text: {
        fontSize: 15,
        color: 'black'
    },
    input: {
        height: 40,
        margin: 5,
        borderWidth: 2,
        padding: 10,
        backgroundColor: 'white',
        width: 200
      },
    
  

})