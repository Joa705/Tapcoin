import AsyncStorage from '@react-native-async-storage/async-storage';




    // Get users data from localstorage
    export const getUsesScoreData = async () =>{
      
        return await AsyncStorage.getItem('score');
    }