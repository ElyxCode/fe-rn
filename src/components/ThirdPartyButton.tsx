import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../styles/colors';
import {SvgProps} from 'react-native-svg';

type Props = {
  buttonText: string;
  ButtonIcon: React.FC<SvgProps>;
};

export const ThirdPartyButton = ({buttonText, ButtonIcon}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={colors.White}
      onPress={() => {
        console.log('Presione el boton');
      }}>
      <View style={styles.buttonContainer}>
        <ButtonIcon height={25} width={25} />
        <Text style={styles.textButton}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    columnGap: 10,
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.DarkGrayColor,
    textAlign: 'center',
  },
});
