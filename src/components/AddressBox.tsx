import React from "react";
import LocationIcon from '../assets/location.svg';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {colors} from '../styles/colors'


type Props = {
    textButton: string;
    customStyles?: StyleProp<ViewStyle>;
  };

export const AddressBox = ({textButton,customStyles}: Props) => {
    return(
    <>
    <View style={[styles.content, customStyles]}>
        <LocationIcon height={24} width={24} />
        <Text style={styles.text}>{textButton}</Text>
    </View>
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
     paddingLeft:15
  }
})