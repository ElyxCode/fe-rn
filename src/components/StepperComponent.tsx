import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, TextInput} from 'react-native';
import StepperAdd from '../assets/stepper_add_button.svg';
import StepperDecrement from '../assets/stepper_decrement_button.svg';
import Messages from '../constants/Messages';
import {Product} from '../model/product';

import {colors} from '../styles/colors';
import {isAndroid} from '../constants/Platform';

type StepperProps = {
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  product: Product;
};

export const StepperComponent = ({
  itemCount,
  setItemCount,
  product,
}: StepperProps) => {
  const Decrement = () => {
    if (itemCount <= 1) {
      return;
    }

    setItemCount(itemCount - 1);

    if (itemCount > product.stock) {
      Alert.alert(
        Messages.titleMessage,
        Messages.exceededProductStockMessage + product.stock.toString(),
        [
          {
            text: 'Aceptar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'default',
          },
        ],
      );
      return;
    }
  };

  const Increment = () => {
    if (itemCount >= product.stock) {
      Alert.alert(
        Messages.titleMessage,
        Messages.exceededProductStockMessage + product.stock.toString(),
        [
          {
            text: 'Aceptar',
            onPress: () => console.log('Cancel Pressed'),
            style: 'default',
          },
        ],
      );
    }

    setItemCount(itemCount + 1);
  };

  const handleOnEditing = (value: string) => {
    if (Number(value) === 0) {
      setItemCount(1);
    }
  };
  return (
    <View style={style.container}>
      <View style={style.buttonStep}>
        <StepperDecrement onPress={() => Decrement()} />
      </View>

      <TextInput
        style={style.textNumber}
        value={itemCount.toString()}
        keyboardType={isAndroid ? 'numeric' : 'number-pad'}
        onChangeText={text => {
          setItemCount(() => {
            return Number(
              text
                .replace(' ', '')
                .replace('-', '')
                .replace(',', '')
                .replace('.', ''),
            );
          });
        }}
        onEndEditing={({nativeEvent: {text}}) => {
          handleOnEditing(text);
        }}
      />

      <View style={style.buttonStep}>
        <StepperAdd onPress={() => Increment()} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStep: {
    backgroundColor: colors.SecondaryColor,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  sign: {
    color: 'white',
    fontSize: 24,
  },
  textNumber: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 28,
    textAlign: 'center',
  },
});
