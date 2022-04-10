import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
        fontSize: 40,
        color: "gold",
        
        
    },
    ButtonContainer: {
      elevation: 4,
      backgroundColor: "#f0e68c",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
     
    },
    ButtonText: {
      fontSize: 16,
      color: "black",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase",
      
    }
  });

export default styles;
  