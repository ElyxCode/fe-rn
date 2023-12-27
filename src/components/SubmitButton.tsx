import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '../styles/colors';

type Props = {
  textButton: string;
  customStyles?: StyleProp<ViewStyle>;
  customTextStyles?: StyleProp<TextStyle>;
  activeOpacity?: number;
  onPress?(): void;
};

export const SubmitButton = ({
  textButton,
  customStyles,
  customTextStyles,
  activeOpacity = 0.9,
  onPress,
}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={'transparent'}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      <View style={[styles.buttonContainer, customStyles]}>
        <Text style={[styles.textButton, customTextStyles]}>{textButton}</Text>
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
