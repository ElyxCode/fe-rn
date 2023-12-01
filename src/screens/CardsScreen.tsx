import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {LoaderScreen} from './LoaderScreen';

import {CustomNavBar} from '../components/CustomNavBar';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {
  deleteCardService,
  getCardsService,
  updateCardService,
} from '../services/card/card';
import {setCard} from '../services/card/cardSlice';

import {Card} from '../model/Card';

import PlusAddIcon from '../assets/plus_add.svg';
import CardsIcon from '../assets/cards_primary.svg';
import TrashBucketIcon from '../assets/trash.svg';

import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

type CardItem = {
  id: number;
  name: string;
  lastNumber: string;
  verify: boolean;
  active: boolean;
};

export const CardsScreen = ({navigation}: any) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = useAppSelector(state => state.authToken.token);

  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

  useEffect(() => {
    const getCards = async () => {
      setIsLoading(true);
      const response = await getCardsService(token);
      if (response.ok) {
        setCards((response.data as Card[]) ?? []);
        if (
          response.data?.length == 1 &&
          response.data.some(card => card.active === false)
        ) {
          let card = response.data.find(card => card.active == false);
          if (card) {
            setActiveFirstCard(card);
          }
        }
      } else {
        setCards([] as Card[]);
      }
      setIsLoading(false);
    };

    getCards();
  }, [isFocused]);

  const setActiveFirstCard = async (card: Card) => {
    card.active = true;
    const response = await updateCardService(token, card.id.toString(), card);
    if (response.ok) {
      dispatch(setCard(response.data as Card));
    }
  };

  const setActiveCard = async (card: Card) => {
    setIsLoading(true);
    if (cards.some(card => card.active)) {
      let oldCard = cards.find(card => card.active);
      if (oldCard) {
        oldCard.active = false;
        await updateCardService(token, oldCard?.id.toString(), oldCard);
      }
    }
    const respo = await updateCardService(token, card.id.toString(), card);
    if (respo.ok) {
      dispatch(setCard(respo.data as Card));
    }

    navigation.goBack();
    setIsLoading(false);
  };

  const deleteCard = async (cardId: string) => {
    setIsLoading(true);
    const responseStatus = await deleteCardService(token, cardId);
    if (responseStatus.ok) {
      Alert.alert(Messages.titleMessage, responseStatus.data?.status, [
        {text: Messages.okButton},
      ]);
      const response = await getCardsService(token);
      if (response.ok) {
        setCards((response.data as Card[]) ?? []);
        if ((response.data as Card[]).some(card => !card.active)) {
          let oldCard = (response.data as Card[]).find(card => !card.active);
          if (oldCard) {
            oldCard.active = true;
            const response = await updateCardService(
              token,
              oldCard?.id.toString(),
              oldCard,
            );
            if (response.ok) {
              dispatch(setCard(response.data as Card));
            }
          }
        }
      } else {
        setCards([] as Card[]);
      }
    } else {
      Alert.alert(Messages.titleMessage, responseStatus.data?.error, [
        {text: Messages.okButton},
      ]);
    }

    setIsLoading(false);
  };

  const CardItemRender = ({id, name, lastNumber, verify, active}: CardItem) => {
    return (
      <Pressable
        onPress={() => {
          let updateCard: Card = {
            id,
            name,
            last_numbers: lastNumber,
            verified: verify,
            active: true,
          };

          setActiveCard(updateCard);
        }}>
        <View style={[styles.cardItemContainer, {borderWidth: active ? 1 : 0}]}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CardsIcon height={24} width={24} />
            <View style={styles.cardDescriptionContainer}>
              <Text style={[styles.cardDescriptionText, {fontSize: 10}]}>
                {name}
              </Text>
              <Text style={styles.cardDescriptionText}>**** {lastNumber}</Text>
              <Text style={styles.cardDescriptionText}>
                {verify && 'Verificado'}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => {
              deleteCard(id.toString());
            }}>
            <TrashBucketIcon height={24} width={24} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar titleText="Métodos de pago" />
      <View style={styles.container}>
        <ScrollView style={styles.cardsContainer}>
          {cards.length > 0 && (
            <Text style={styles.selectCardTitleText}>
              Selecciona la tarjeta que deseas usar
            </Text>
          )}
          {cards.length !== 0 ? (
            cards.map(item => (
              <CardItemRender
                key={item.id}
                id={item.id}
                name={item.name}
                lastNumber={item.last_numbers}
                verify={item.verified}
                active={item.active}
              />
            ))
          ) : (
            <View style={{alignItems: 'center', marginTop: 15}}>
              <Text>No tienes tarjetas</Text>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('CardFormScreen')}>
          <View style={styles.addCardButtonContainer}>
            <PlusAddIcon height={24} width={24} />
            <Text style={styles.addCardButtonText}>Agregar tarjeta</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  cardsContainer: {
    flex: 1,
  },
  selectCardTitleText: {
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 18,
    marginBottom: 10,
  },
  addCardButtonContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.SecondaryColor,
    borderRadius: 10,
    padding: 10,
    columnGap: 8,
    marginBottom: 10,
  },
  addCardButtonText: {
    color: colors.PrimaryTextColor,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  cardItemContainer: {
    borderColor: colors.PrimaryColor,
    backgroundColor: colors.White,
    borderRadius: 10,
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDescriptionContainer: {
    marginLeft: 22,
    rowGap: 3,
  },
  cardDescriptionText: {
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
    fontSize: 12,
  },
});
