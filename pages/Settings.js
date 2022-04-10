import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image } from 'react-native';
import styles from '../Styles';


export default function Settings({navigation}){

    return(
        <View style={styles.container}>
            <Text>Test</Text>
            <Button title='Logout' onPress={() => {navigation.navigate('Login')}}/>         
        </View>
    )
}