import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import {SubmitButton} from '../components/SubmitButton';

import CallIcon from '../assets/call.svg';
import {colors} from '../styles/colors';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {setOrderUserPhoneTemp} from '../services/user/userSlice';
import {isAndroid} from '../constants/Platform';
import Messages from '../constants/Messages';

export const PhoneNumberScreen = ({navigation}: any) => {
  const orderUserPhoneTemp = useAppSelector(
    state => state.user.orderUserPhoneTemp?.phoneNumber,
  );
  const [phone, setPhone] = useState(orderUserPhoneTemp ?? '');

  const dispatch = useAppDispatch();

  const handleOnChangeText = (text: string) => {
    setPhone(text);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <KeyboardAvoidingView
        behavior={isAndroid ? 'height' : 'padding'}
        style={{flex: 1}}>
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Información de contacto</Text>
            <Text style={styles.descriptionText}>
              Ingresa o edita tu número de teléfono para contactarte
            </Text>
          </View>

          <View style={{flex: 1, justifyContent: 'space-around'}}>
            <CustomTextInput
              InputIcon={CallIcon}
              placeHolder={'Ingrese un número de teléfono'}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={(text: string) => handleOnChangeText(text)}
            />
          </View>

          <SubmitButton
            textButton="Continuar"
            onPress={() => {
              if (phone.length === 0 || phone.length < 8) {
                Alert.alert(
                  Messages.titleMessage,
                  phone.length === 0
                    ? Messages.orderPhoneRequired
                    : Messages.orderPhoneMinimunLength,
                  [
                    {
                      text: Messages.okButton,
                    },
                  ],
                  {cancelable: false},
                );
                return;
              }
              dispatch(setOrderUserPhoneTemp({phoneNumber: phone}));
              navigation.goBack();
            }}
            customStyles={{marginBottom: 10}}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  titleText: {
    paddingVertical: 10,
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
  },
  descriptionText: {
    color: colors.DarkGrayColor,
    fontSize: 16,
  },
});
