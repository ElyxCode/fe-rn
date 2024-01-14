import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Rating} from '@kolking/react-native-rating';

import {SubmitButton} from './SubmitButton';

import {ratingOrderService} from '../services/order';

import {Order} from '../model/Order';

import OrderDeliveredIcon from '../assets/order_delivered.svg';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';
import {colors} from '../styles/colors';

type RatingViewComponentProp = {
  token: string;
  currentOrder: Order;
  setShowReview: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RatingViewComponent = ({
  token,
  currentOrder,
  setShowReview,
}: RatingViewComponentProp) => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const handleChange = useCallback(
    (value: number) => setRating(value),
    [rating],
  );

  const ratingOrder = async () => {
    const response = await ratingOrderService(
      token,
      currentOrder.id.toString(),
      rating.toString(),
      comment,
    );
    if (response.ok) {
      setShowReview(true);
      setComment('');
      setRating(5);
    } else {
      const AsyncAlert = async () =>
        new Promise(resolve => {
          Alert.alert(
            Messages.titleMessage,
            Messages.errorReviewServicesResponseMessage,
            [
              {
                text: 'ok',
                onPress: () => {
                  resolve('YES');
                },
              },
            ],
            {cancelable: false},
          );
        });

      return await AsyncAlert();
    }
  };

  const skipRatingOrder = async () => {
    const response = await ratingOrderService(
      token,
      currentOrder.id.toString(),
      '5',
      '',
    );

    setShowReview(true);
    setComment('');
    setRating(5);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <OrderDeliveredIcon height={85} width={85} style={{marginTop: 15}} />
        <Text style={styles.orderStateText}>Orden Entregada</Text>
        <Text style={styles.messageText}>
          ¿Cómo fue tu experiencia con {currentOrder.branch.name}?
        </Text>
        <Rating
          variant="stars-outline"
          size={30}
          scale={1}
          maxRating={5}
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
          keyboardType="default"
        />

        <SubmitButton
          textButton="Enviar comentario"
          customStyles={{
            backgroundColor: colors.SecondaryColor,
            marginVertical: 25,
          }}
          onPress={() => ratingOrder()}
        />
        <Pressable onPress={() => skipRatingOrder()}>
          <Text style={styles.skipText}>Omitir</Text>
        </Pressable>
      </ScrollView>
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
    padding: 8,
    color: colors.White,
  },
  skipText: {
    color: colors.SecondaryTextColor,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
});
