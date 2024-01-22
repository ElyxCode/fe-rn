import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {LoaderScreen} from '../screens/LoaderScreen';

import {deleteUserService} from '../services/user/user';
import {
  clearOrderUserBillingTemp,
  clearOrderUserPhoneTemp,
  clearUserData,
} from '../services/user/userSlice';
import {clearToken} from '../services/auth/authSlice';
import {clearProduct} from '../services/product/productSlice';
import {clearCard, clearCardConfirmAdded} from '../services/card/cardSlice';
import {clearAddress} from '../services/address/addressSlice';

import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

type ButtonProps = {
  text: string;
  customStylesButton?: StyleProp<ViewStyle>;
  onPress?(): void;
};

export const DeleteAccountModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useAppSelector(state => state.authToken.token);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const deleteAccount = async () => {
    setIsLoading(true);
    const response = await deleteUserService(token);
    if (response.ok) {
      deleteTempData();
      navigation.navigate('WelcomeScreen' as never);
      setIsLoading(false);
    } else {
      const AsyncAlert = async () =>
        new Promise(resolve => {
          Alert.alert(
            Messages.titleMessage,
            Messages.UnAvailableServerMessage,
            [
              {
                text: Messages.okButton,
                onPress: () => {
                  resolve('YES');
                },
              },
            ],
            {cancelable: false},
          );
        });
      setIsLoading(false);
      return await AsyncAlert();
    }
  };

  const deleteTempData = () => {
    dispatch(clearUserData());
    dispatch(clearToken());
    dispatch(clearProduct());
    dispatch(clearCard());
    dispatch(clearAddress());
    dispatch(clearOrderUserBillingTemp());
    dispatch(clearOrderUserPhoneTemp());
    dispatch(clearCardConfirmAdded());
  };

  const OptionButton = ({text, customStylesButton, onPress}: ButtonProps) => {
    return (
      <Pressable onPress={onPress}>
        <View style={[styles.buttonContainer, customStylesButton]}>
          <Text style={styles.buttonText}>{text}</Text>
        </View>
      </Pressable>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.popUpContainer}>
        <View style={styles.popUpBody}>
          <Text style={styles.popUpTitleText}>
            ¿Seguro que deseas eliminar tu cuenta?
          </Text>
          <Text style={styles.popUpDescriptionText}>
            Esto borrará tu historial de pedidos y la información de tu cuenta
          </Text>
          <View style={styles.buttonsContainer}>
            <OptionButton
              text="NO"
              customStylesButton={{
                backgroundColor: colors.PrimaryColor,
              }}
              onPress={() => navigation.goBack()}
            />
            <OptionButton
              text="SI"
              customStylesButton={{backgroundColor: colors.RedColor}}
              onPress={() => deleteAccount()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PopUpBackground,
  },
  popUpContainer: {
    backgroundColor: colors.White,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  popUpBody: {
    rowGap: 20,
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  popUpTitleText: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  popUpDescriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.DarkGrayColor,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingVertical: 11,
  },
  buttonText: {
    color: colors.White,
    fontFamily: 'Poppins-SemiBold',
  },
});
