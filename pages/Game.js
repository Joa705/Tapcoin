import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import styles from '../Styles';
import { authentication, db } from '../Firebase-config';
import { getDoc, doc, updateDoc, getDocs, collection} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllButtons from '../AllButtons';




export default function Game({navigation}){

    // UseStates
    const [count, setCount] = useState(-1);
    const [userName, setUserName] = useState('');
    const [currentButton, setCurrentButton] = useState([{'id': '0', 'name': require('../ButtonImage/mynt.png'), 'height': 150 * 1.5, 'width': 150 * 1.5} ]);


    
    // Store users score in locallstorage.
    const storeData = async (count1) => {
        const scoreData = JSON.stringify(count1);
        try { 
            await AsyncStorage.setItem('score', scoreData)

        } catch (error) {console.log(error)};
    }


    // Get data stored locally
    const getData = async () => {
        //Get Users score from locallstorage
        try{
            const localScore = await AsyncStorage.getItem('score');
            if (localScore !== null){ 
                const currentScore = parseInt(localScore);
                if(currentScore !== count){
                console.log(localScore);
                setCount(parseInt(localScore));
                getuserPageload();
                }
            }
        }
        catch (error){console.log(error)};

        getDataButton();
      
    }

    const getDataButton = async () => {
          //Get Users current button type from localstorage
          try{
            const localButton = await AsyncStorage.getItem('Button');
            const thiscurrentButton = JSON.parse(localButton);
            if(thiscurrentButton !== null){
                if(thiscurrentButton != currentButton[0].id)
                console.log("Currentbutton " + thiscurrentButton)

                // Loop true each button and find the selected button
                AllButtons.forEach(element => {
                    if(element.id == thiscurrentButton){
                        if(element.owned == false){return} // If the user dosent own that button, return
                        setCurrentButton([{'id': element.id, 'name': element.name, 'height': element.height * 1.5, 'width': element.width * 1.5}]);
                        return;
                    }
                });

            }

        }catch(error){console.log(error)};
    }


    // Get the logged in users current score
    const getuserPageload = async () => {
        const user = authentication.currentUser;
       
        //Gets Users data from firestore
        const docRef = doc(db, 'Users', user.email);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Fetching users Score..")
            setCount(docSnap.data().Score);
            setUserName(docSnap.data().Username);            
        }else{console.log("Cant find User")}

        //Get users buttons owned from firestore
        const Userrefrences = collection(db, "Users", user.email, 'Buttons');
        const docButton = await getDocs(Userrefrences)
        
        //Store users owned buttons in localfile (AllButtons)
        docButton.docs.forEach((doc) => {
            AllButtons.forEach(element => {
                if(doc.id == element.id){
                    element.owned = true;
                }
            });
        });
        
        getDataButton();
    };





    useEffect(() => {
    
    // Update Users score in firestore Database
    const updateUserScore = async () => {
        const localScore = await AsyncStorage.getItem('score'); // Get score local
            if (localScore === null){ 
                return
            }
        const currentScore = parseInt(localScore);

        console.log(currentScore)
        const currentUser = authentication.currentUser; // Get current user
        const docRef = doc(db, 'Users', currentUser.email);
        await updateDoc(docRef, {'Score': currentScore}) // Update score to firestore for that user
        .then((result) => {console.log("Updated Score")})
        .catch((result) => {console.log("Failed to update score")})
                
    }   

    const Interval = setInterval(() => {
        updateUserScore()
    }, 1000 * 10)

    return () => {
        clearInterval(Interval);
    }

    }, [])

   

    useEffect(() => {
        if(count == -1){getuserPageload()}
        
          //Check for Updates in LocalStorage every second
          const IntervalLocal = setInterval(() => {
            getData()

        }, 1000 * 1);


        return () => {
            clearInterval(IntervalLocal);
        };


    }, [storeData(count)])


    


    return(
        <View style={styles.container}>

            <View style={GameStyles.top}>
                <View style={{borderBottomWidth: 2, borderColor: '#674919', width: 180, alignItems: 'center'}}>
                    <Text style={{color:'#f0e68c', fontStyle:'italic', fontSize:18, textTransform: "uppercase",}}>{userName}</Text>
                </View>
            </View>
            

            <View style={GameStyles.mid}>
            <Text style={{color:'#f0e68c', fontStyle:'italic', fontSize:18}}>TC: {count}</Text>
             <TouchableOpacity
             onPress={() => setCount(count + 1)}>
                 <Image source={currentButton[0].name}  style={{width:currentButton[0].width, height:currentButton[0].height}}/>
             </TouchableOpacity>             
            </View>

                

        </View>
    )
}

const GameStyles = StyleSheet.create ({
    top: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    mid: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bot: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})