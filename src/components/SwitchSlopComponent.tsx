import React, { useState } from "react"
import {TouchableOpacity, View ,Text, StyleSheet, KeyboardTypeOptions, ColorValue} from 'react-native'
import { SvgProps } from "react-native-svg";
import { colors } from "../styles/colors"

type Props = {
  InputIcon?:  React.FC<SvgProps>;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
  fill?: ColorValue;
  isPassword?: boolean;
  onChange?: any;
  onBlur?: any;
  value?: boolean;
  editable?: boolean;
};

export const SwitchSlopeComponent = ({onChange, value, onBlur}:Props) => {

  const [hasSlope,setSlope ] = useState(false);
  
  const slopeSelected = () => {

  }

  return(
        <View>
        <Text style={styles.title}>¿Hay subidas y bajadas en el camino?</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={!hasSlope ? styles.selected : styles.deselected}  onPress={  () => {
              setSlope(false)
              onChange(false)
              }}>
              <Text style={!hasSlope? styles.selectedText : styles.deselectedText} >No</Text>
            </TouchableOpacity>
            <TouchableOpacity style={hasSlope ? styles.selected : styles.deselected} onPress={ () =>
               {
                
                setSlope(true)
                onChange(true)
               }
               }>
            <Text style={hasSlope? styles.selectedText : styles.deselectedText} > Si</Text>
           </TouchableOpacity>
        </View>
       </View>
    )
}

const styles = StyleSheet.create({
   title:{
    color:colors.PrimaryColor, 
    fontFamily:'Poppins-Regular',
    fontSize:12
   },
    buttonContainer:{
        flexDirection:'row',
        flex:1,
        gap:14
       },selected:{
       backgroundColor:colors.SecondaryColor,
       flex:1,
       alignItems:'center',
       fontSize:16,
       paddingVertical:16,
       borderRadius:10
       
    },deselected:{
      backgroundColor:'white',
      flex:1,
      alignItems:'center',
      fontSize:16,
      paddingVertical:16,
      borderRadius:10,
      borderWidth:1,
      borderColor:colors.PrimaryColor

    },selectedText:{
      color:'white',
      fontFamily:'Poppins-SemiBold'
    },deselectedText:{
     color:colors.PrimaryColor ,
     fontFamily:'Poppins-SemiBold'
    }
})