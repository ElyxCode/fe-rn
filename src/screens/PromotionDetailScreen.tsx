import React from "react";
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import { PromotionImageDetail } from "../components/PromotionImageDetail";
import { Promotion } from "../model/Promotion";
import { colors } from "../styles/colors";

type PromoProps = {
    promotion: Promotion;
    navigation: any;
  };

export const PromotionDetailScreen = ({route, navigation}:any) =>{
    const {promotion}: {promotion: Promotion} = route.params;
    console.log(promotion,'promocion')
    return(
        <>
        <ScrollView> 
       <View style={styles.container}>
        
        <PromotionImageDetail image={promotion.image} height={165}  ></PromotionImageDetail>
        <Text style={styles.title}>{promotion.title}</Text>
        <Text>{promotion.description}</Text>
       </View>
       </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
  paddingHorizontal:21
    },
    title:{
     fontSize:20,
     marginTop:35,
     marginBottom:16,
     color:colors.PrimaryColor,
     fontFamily:'Poppins-SemiBold'
    },
    description:{
        fontSize:16,
        color:colors.DarkGrayColor,
        fontFamily:'Poppins-Regular'


    }
})

