import {TouchableHighlight, View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/colors';

type Props = {
  buttonText: string;
};

export const SubmitButton = ({buttonText}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={colors.White}
      onPress={() => {
        console.log('Presione el boton');
      }}>
      <View style={styles.buttonContainer}>
        <Text style={styles.textButton}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.PrimaryColor,
    justifyContent: 'center',
    height: 53,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.White,
    textAlign: 'center',
  },
});
