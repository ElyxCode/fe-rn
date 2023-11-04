import React from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {colors} from '../styles/colors';
import {SvgProps} from 'react-native-svg';
import {isAndroid} from '../constants/Platform';

type Props = {
  InputIcon: React.FC<SvgProps>;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
  fill?: ColorValue;
  isPassword?: boolean;
  onChangeText?: any;
  onBlur?: any;
  value?: string;
};

export const CustomTextInput = ({
  InputIcon,
  keyboardType,
  placeHolder,
  fill,
  isPassword = false,
  value,
  onChangeText,
  onBlur,
}: Props) => {
  return (
    <View style={styles.container}>
      <InputIcon height={25} width={25} fill={fill} />
      <TextInput
        style={styles.textInput}
        keyboardType={keyboardType}
        placeholder={placeHolder}
        secureTextEntry={isPassword}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderColor: colors.PrimaryColor,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: isAndroid ? 12 : 20,
  },
  textInput: {
    color: colors.Black,
    marginHorizontal: 13,
    width: '100%',
    fontSize: 14,
  },
});
