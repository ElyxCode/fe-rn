import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PlusAddIcon from '../assets/plus_add.svg';
import {colors} from '../styles/colors';

type AddButtonProps = {
  onPress?: () => void;
  text: string;
};

export const AddProductButton = ({onPress, text}: AddButtonProps) => {
  return (
    <TouchableOpacity style={styles.plusAddContainer} onPress={onPress}>
      <PlusAddIcon />
      <Text style={styles.plusAddText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plusAddContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.SecondaryColor,
    padding: 10,
    columnGap: 10,
    marginVertical: 10,
    backgroundColor: colors.White,
  },
  plusAddText: {
    fontSize: 12,
    color: colors.PrimaryColor,
    fontFamily: 'Poppins-SemiBold',
    textAlignVertical: 'center',
  },
});
