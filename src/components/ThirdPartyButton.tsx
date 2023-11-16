import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../styles/colors';
import {SvgProps} from 'react-native-svg';

type Props = {
  textButton: string;
  ButtonIcon: React.FC<SvgProps>;
  customBackgroundColor?: string;
  customTextColor?: string;
  onPress?: any;
};

export const ThirdPartyButton = ({
  textButton,
  ButtonIcon,
  customBackgroundColor = colors.White,
  customTextColor = colors.DarkGrayColor,
  onPress,
}: Props) => {
  return (
    <TouchableHighlight underlayColor={colors.White} onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: customBackgroundColor},
        ]}>
        <ButtonIcon height={25} width={25} />
        <Text style={[styles.textButton, {color: customTextColor}]}>
          {textButton}
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
