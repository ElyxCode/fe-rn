import React from "react";
import LocationIcon from '../assets/location.svg';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {colors} from '../styles/colors'


type Props = {
    textButton: string;
    customStyles?: StyleProp<ViewStyle>;
    onPress: () => void;
  };

export const AddressBox = ({textButton,customStyles, onPress}: Props) => {
    return(
    <>
    <TouchableOpacity onPress={onPress}  style={[styles.content, customStyles]}> 
        <LocationIcon height={24} width={24} />
        <Text numberOfLines={1} lineBreakMode='tail' style={styles.text}>{textButton}</Text>
    </TouchableOpacity>
    </>
    );
}

const styles = StyleSheet.create({
  content:{
    flexDirection:'row',
    paddingHorizontal:15,
    paddingVertical:12,
    borderColor:colors.PrimaryColor,
    borderWidth:1,
    borderRadius:10
  },
  text:{
     paddingLeft:15,
     fontSize:14,
     fontFamily:'Poppins-Medium',
     
  }
})