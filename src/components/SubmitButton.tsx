import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {colors} from '../styles/colors';

type Props = {
  textButton: string;
  customStyles?: StyleProp<ViewStyle>;
  onPress?(): void;
};

export const SubmitButton = ({textButton, customStyles, onPress}: Props) => {
  return (
    <TouchableHighlight underlayColor={colors.White} onPress={onPress}>
      <View style={[styles.buttonContainer, customStyles]}>
        <Text style={styles.textButton}>{textButton}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: colors.PrimaryColor,
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
