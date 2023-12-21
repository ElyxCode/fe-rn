import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Rating} from '@kolking/react-native-rating';

import {SubmitButton} from './SubmitButton';

import OrderDeliveredIcon from '../assets/order_delivered.svg';

import {isAndroid} from '../constants/Platform';
import {colors} from '../styles/colors';

type RatingViewComponentProp = {
  branchName: string;
};

export const RatingViewComponent = ({branchName}: RatingViewComponentProp) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number>(5);
  const handleChange = useCallback(
    (value: number) => setRating(value),
    [rating],
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <OrderDeliveredIcon height={85} width={85} style={{marginTop: 15}} />
        <Text style={styles.orderStateText}>Orden Entregada</Text>
        <Text style={styles.messageText}>
          ¿Cómo fue tu experiencia con {branchName}?
        </Text>
        <Rating
          variant="stars-outline"
          size={30}
          scale={1}
          rating={rating}
          spacing={12}
          baseColor={colors.SecondaryColor}
          fillColor={colors.SecondaryColor}
          touchColor={colors.SecondaryColor}
          onChange={handleChange}
          style={{marginVertical: 10, alignItems: 'flex-start'}}
        />
        <Text style={[styles.messageText, {marginVertical: 10}]}>
          Deja tu comentario
        </Text>

        <TextInput
          value={comment}
          onChangeText={setComment}
          textAlignVertical="top"
          placeholder="Tu comentario"
          placeholderTextColor={
            isAndroid
              ? colors.textInputBorderColorAndroid
              : colors.textInputBorderColorIos
          }
          style={styles.textInputContainer}
          multiline={true}
          numberOfLines={4}
        />

        <SubmitButton
          textButton="Enviar comentario"
          customStyles={{
            backgroundColor: colors.SecondaryColor,
            marginVertical: 25,
          }}
        />
        <Text style={styles.skipText}>Omitir</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  orderStateText: {
    color: colors.White,
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    paddingVertical: 28,
  },
  messageText: {
    color: colors.White,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  textInputContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isAndroid
      ? colors.textInputBorderColorAndroid
      : colors.textInputBorderColorIos,
  },
  skipText: {
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
