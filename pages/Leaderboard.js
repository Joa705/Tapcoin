import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import styles from '../Styles';
import { authentication, db } from '../Firebase-config';
import {collection, getDocs, updateDoc, doc, deleteDoc, addDoc, where, query, orderBy, setDoc} from 'firebase/firestore'


export default function Leaderboard({navigation}){

    const [usersList, setUsersList] = useState([]);
    const [usersFriend, setUsersFriends] = useState([]);
    const [friendPage, setFriendPage] = useState('All Users');

    //DB refrences and auth user
    const currentUser = authentication.currentUser;
    const Userrefrences = collection(db, "Users");
    const UsersFriendsRefrence = collection(db, 'Users', currentUser.email, 'Friends');

    // Add user to friends list in firestore
    const AddUsersFriends = async (newemail) => {
        const docRef = doc(db, 'Users', currentUser.email, "Friends", newemail)
        await setDoc(docRef , {'Id': newemail})
        .then(() => {
            GetUsersFriends();
            console.log("Added friend " + newemail)
        })
        .catch(() => {console.log("Failed to add user")})
    }


    //Get users friends from firestore
    const GetUsersFriends = async () => {
        const FriendsList = await getDocs(UsersFriendsRefrence)
        
        setUsersFriends(FriendsList.docs.map((doc) => (
            {id:doc.id})));
 
    };


    const DeleteUsersFriend = async (id) => {
        const docref = doc(db, "Users", currentUser.email, "Friends", id);
        await deleteDoc(docref)
        .then(() => {
            console.log("Removed friend " + id)
            GetUsersFriends()
        })
        .catch(() => {console.log("Failed to remove firend " + id)});

    };
    


    //fetching students from the database using async function.
    const getUsers = async () => {
        const data = query(Userrefrences, orderBy("Score", "desc"));
        const datasnap = await getDocs(data);
        // Add students to the studentlist by maping the data from the database.
        setUsersList(datasnap.docs.map((doc) => (
            {...doc.data(), id: doc.id})));
    };


    

     //useeffect to automatic get students from the database on page refresh
    useEffect(() => {
        getUsers();
        GetUsersFriends();

    }, [])


    //Display friends List
    const FriendsListView = () => {
        if(usersFriend === undefined || usersFriend.length === 0){
            console.log(usersFriend)
            return(
                <View>
                    <Text>No Friends Added</Text>
                </View>
            )
        }

        const FriendsRef = []
        usersFriend.forEach(doc => {
            usersList.forEach(usr => {
                if(doc.id === usr.id){
                    FriendsRef.push({id: usr.id, score: usr.Score, name: usr.Username})                  
                }
            });
        });
       
        return(
            <View>
                {FriendsRef.map((doc) =>(
                    <View key={doc.id} style={leaderstyles.top}>
                        <Text style={styles.ButtonText}>{doc.name}</Text>
                        <Text style={styles.ButtonText}>TC: {doc.score}</Text>
                      
                     
                        <View style={{position: 'absolute', right: 10}}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => DeleteUsersFriend(doc.id)}>
                         <Text style={styles.ButtonText}>Remove</Text>
                        </TouchableOpacity> 
                        </View>

                    </View>
                ))}
            </View>
        )
    }

    //Display All UsersList
    const AllUsersView = () => {
        return(
            <View>
                 {usersList.map((item) =>(
                    <View key={item.Email} style={leaderstyles.top}>
                        <Text style={styles.ButtonText}>{item.Username}</Text>
                        <Text style={styles.ButtonText}>TC: {item.Score}</Text>                      
                      
                        
                        <View style={{position: 'absolute', right: 10}}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => AddUsersFriends(item.id)}>
                         <Text style={styles.ButtonText}>Add</Text>
                        </TouchableOpacity>
                        </View>


                          
                     
                                           
                    </View>
                ))}
            </View>
        )
    }



    return(
        <View style={styles.container}>


            <View style={leaderstyles.list}>
                <View style={leaderstyles.outertop}>

                <ScrollView>                 
                    {friendPage == 'All Users'?
                    AllUsersView()
                    :
                    FriendsListView()
                    } 
                </ScrollView>
                </View>
            </View> 


              <View style={leaderstyles.container}>
                    <Text style={{color: 'white', fontSize: 20}}>{friendPage}</Text>
                    <View style={{height:10}}></View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => setFriendPage('All Users')}>
                            <Text style={styles.ButtonText}>All Users</Text>
                        </TouchableOpacity>

                        <View style={{width:30}}></View>
                        <TouchableOpacity style={styles.ButtonContainer} onPress={() => setFriendPage('Friends')}>
                            <Text style={styles.ButtonText}>Friends</Text>
                        </TouchableOpacity>
                    </View> 
                </View>  

                       
        </View>
    )
}

const leaderstyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outertop:{
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        elevation: 4,
        backgroundColor: "#DCC66F",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:350
    },
    top: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        borderWidth: 3,
        elevation: 4,
        backgroundColor: "#DCC66F",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width:300
    },
    list: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    }
  
})