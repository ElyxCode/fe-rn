import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomNavBar} from '../components/CustomNavBar';
import {StyleSheet, Text, View} from 'react-native';

import {SubmitButton} from '../components/SubmitButton';
import {CustomTextInput} from '../components/CustomTextInput';

import ReceiptDiscountIcon from '../assets/receipt-disscount.svg';
import ReceiptDiscountBlueIcon from '../assets/receipt-disscount-blue.svg';

import {colors} from '../styles/colors';

export const PromoCodeScreen = ({route, navigation}: any) => {
  const {setPromotionCode} = route.params;
  const [promoCode, setPromoCode] = useState('');
  const handlePromoCode = (text: string) => {
    setPromoCode(text);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <View style={styles.container}>
        <ReceiptDiscountIcon height={40} width={40} style={{marginTop: 10}} />
        <Text style={styles.titleText}>Agregar código promocional</Text>
        <CustomTextInput
          InputIcon={ReceiptDiscountBlueIcon}
          placeHolder="Ingresa tu código promocional"
          value={promoCode}
          onChangeText={(text: string) => handlePromoCode(text)}
        />
      </View>
      <SubmitButton
        textButton="Agregar código"
        customStyles={{marginHorizontal: 40, marginBottom: 10}}
        onPress={() => {
          setPromotionCode(promoCode);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  titleText: {
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 30,
  },
});
