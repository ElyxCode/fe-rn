
import { FlatList, SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import PlusAdd from '../assets/plus_add.svg'
import { colors } from '../styles/colors';

interface AddButtonProps{
    text:string;
    onPress?: () => void;

}

export const AddButton = ({onPress, text}:AddButtonProps) => {

    
    return(
        <>
          <TouchableOpacity style={styles.container} onPress={onPress} >
        <PlusAdd ></PlusAdd>
        <Text style={styles.text}>{text}</Text>
        </TouchableOpacity> 
        </>
    )
}

const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
       justifyContent:'center',
       borderRadius:10,
       borderWidth:1,
       borderColor:colors.SecondaryColor,
       padding:10,
       marginVertical:10,
       marginHorizontal:20
    }, text:{
        fontSize:12,
        color:colors.PrimaryColor,
        fontFamily:'Poppins-SemiBold',
       
        textAlignVertical:'center'
    }

})