import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../styles/colors';
import {SvgProps} from 'react-native-svg';

type Props = {
  buttonText: string;
  ButtonIcon: React.FC<SvgProps>;
  customBackgroundColor?: string;
  customColorText?: string;
};

export const ThirdPartyButton = ({
  buttonText,
  ButtonIcon,
  customBackgroundColor = colors.White,
  customColorText = colors.DarkGrayColor,
}: Props) => {
  return (
    <TouchableHighlight
      underlayColor={colors.White}
      onPress={() => {
        console.log('Presione el boton');
      }}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: customBackgroundColor},
        ]}>
        <ButtonIcon height={25} width={25} />
        <Text style={[styles.textButton, {color: customColorText}]}>
          {buttonText}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    columnGap: 10,
  },
  textButton: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
