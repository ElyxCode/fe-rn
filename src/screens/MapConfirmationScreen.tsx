import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { AddressBox } from "../components/AddressBox";
import { SubmitButton } from "../components/SubmitButton";
import { colors } from "../styles/colors";

export const MapConfirmationScreen = () => {
    return(
   <>
   <View style={{flex:1}}>
    <View style={styles.headerContainer}>

    </View>
   
    <View style={styles.bottomContainer}>
       
        <Text style={styles.title}>Confirma tu dirección de entrega</Text>
        <Text style={styles.description}>Queremos mostrate los productos disponibles para tu zona</Text>
         <AddressBox customStyles={styles.addressBox} textButton="mi aaddress" ></AddressBox>
        <SubmitButton   textButton="Confirmar dirección" />

        
    </View>
   </View>
   </>
    );
}

const styles = StyleSheet.create({
    headerContainer:{
     flex:2
    },
    bottomContainer:{
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
        flex:1,
        flexDirection:'column',
        paddingHorizontal:36,
        paddingTop:24,
        paddingBottom:28
    },
    title:{
       paddingBottom:4,
       color:colors.PrimaryColor,
       fontSize:16,
       fontFamily:'Poppins-SemiBold'
    },
    description:{
        paddingBottom:22,
        color:colors.DarkGrayColor,
        fontSize:12,
        fontFamily:'Poppins-Regular'

    },addressBox:{
       marginBottom:22
    }
})