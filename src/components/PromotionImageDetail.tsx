import React from "react";
import {Image, StyleProp, Text, View, ViewStyle} from 'react-native'

type imageProps={
    image:string,
    height: number,
    
    customStyles?: StyleProp<ViewStyle>;
}

export const PromotionImageDetail = ({image,height, customStyles}:imageProps) =>{
    return(
        <>
         <Image
          resizeMode="contain"
          source={{uri: image}}
          height={height}
          style={{borderRadius: 12, width:'100%'}}
        />
         
        </>
    )
}