import React from "react";
import { GooglePlaceAutoCompletePrediction } from "../model/GooglePlaceAutoCompleteResult";
import {TouchableOpacity, View, Text, StyleSheet,} from 'react-native';
import SearchIcon from '../assets/search_home.svg'

type Props = {
    item: GooglePlaceAutoCompletePrediction;
    
    onPress: () => void;
  };

export const PlaceCell = ({item, onPress}:Props) =>{
    return(
      <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
        <SearchIcon height={24} width={24}/>
         <Text  style={styles.text}>{item.structured_formatting.main_text}</Text>
        </View>
        </TouchableOpacity>
      </>
    );
}

const styles = StyleSheet.create({
container:{
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'white',
    paddingHorizontal:15,
    paddingVertical:12,
    marginVertical:8

},text:{
  paddingHorizontal:16,
  fontSize:12
}
})