import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';
import { authentication, db } from '../Firebase-config';
import { doc, setDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import AllButtons from '../AllButtons';

export default function Login({navigation}){

    const [isSignedin, setIssignedin] = useState(false);
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

    //Async function to add a new student
    const createnewUser = async () => {
        await setDoc(doc(db, "Users", email), {Username: username,  Email: email, Score: 0})
    }

    //Sign in to user account
    const signinUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
        .then((re) => {
            setIssignedin(true);
            navigatoinhandler();
        })
        .catch((re) => {
            console.log("failed to login")
        })
    };

    //sign out user
    const signoutUser = () => {
        signOut(authentication)
        .then((re) => {
            setIssignedin(false)
        })
        .catch((re) => {console.log("failed to sign out")})
    };

    //Register a new user account, then redirect to game page
    const registerUser = () => {
        createUserWithEmailAndPassword(authentication, email, password)
        .then((re) =>{
             console.log("User registert");
             createnewUser().then((re) =>{
                setIssignedin(true);
                setCreateuser(false);
                navigatoinhandler();
             }).catch((re) => {console.log("failed to add user in firestore")})
             
            })
        .catch((re) => {console.log("Failed to register user")})
    };



    if(createuser){
        return(
            <View style={styles.container}>

            <View style={LoginStyle.top}>
                <Image source={require('../ButtonImage/Logo.png')} style={{width:200, height: 200}}/>
            </View>

            <View style={LoginStyle.mid}>
             <TextInput style={LoginStyle.text} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
             <TextInput style={LoginStyle.text} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
             <View style={{height:10}}></View>
             <TextInput style={LoginStyle.text} placeholder='Username' value={username} onChangeText={(text) => setUsername(text)}/>
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
                <Image source={require('../ButtonImage/Logo.png')} style={{width:200, height: 200}}/>
            </View>

            <View style={LoginStyle.mid}>
            <TextInput style={LoginStyle.text} placeholder='email' value={email} onChangeText={(text) => setEmail(text)}/>
            <View style={{height:10}}></View>
            <TextInput style={LoginStyle.text} placeholder='Password' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
            <View style={{height:10}}></View>

            {isSignedin === true?
                <TouchableOpacity style={styles.ButtonContainer} onPress={signoutUser}>
                    <Text style={styles.ButtonText}>Sign out</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.ButtonContainer} onPress={signinUser}>
                    <Text style={styles.ButtonText}>Sign in</Text>
                </TouchableOpacity>
            }

            <View style={{height:20}}></View>

            {isSignedin === true?
                <TouchableOpacity style={styles.ButtonContainer} onPress={() => {navigation.navigate('Game')}}>
                    <Text style={styles.ButtonText}>Go to game</Text>
                </TouchableOpacity>
                :
                <Text></Text>                

            }
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
  

})