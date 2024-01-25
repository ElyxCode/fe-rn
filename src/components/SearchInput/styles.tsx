import { Platform, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

export const styles = StyleSheet.create({
  container:{marginHorizontal:20},
    searchContainer: {
        flexDirection: 'row',
        marginVertical:5,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: Platform.OS === 'ios' ? 10: 5,
        borderColor: colors.PrimaryColor,
        borderWidth: 1,
        borderRadius: 10,
      },leftContainer: {
        flex: 1, // Esto hace que los elementos en este contenedor ocupen todo el espacio disponible
        flexDirection: 'row', // Esto coloca los elementos en una fila horizontal
        alignItems: 'center', // Esto alinea verticalmente los elementos al centro
        justifyContent: 'flex-start', // Esto alinea los elementos a la izquierda del contenedor
      }, text: {
        paddingLeft: 15,
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        flex: 1,
      },title:{
        color:colors.PrimaryColor,
        fontSize:24, 
        fontFamily:'Poppins-Medium'
      }
})