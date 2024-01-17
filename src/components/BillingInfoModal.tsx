import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {SubmitButton} from './SubmitButton';
import {BillingInfo, SwitchControlButton} from './SwitchControlButton';

import {BillInfo} from '../model/BillInfo';

import {setOrderUserBillingTemp} from '../services/user/userSlice';

import {CustomNavBar} from './CustomNavBar';
import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

export const BillingInfoModal = ({route, navigation}: any) => {
  const {billingData} = route.params;
  const orderUserBillingTemp = useAppSelector(
    state => state.user.orderUserBillingTemp?.billingInfo,
  );

  const [billing, setBilling] = useState<string>(billingData.bill_type ?? '');
  const [typePerson, setTypePerson] = useState<string>(
    billingData.bill_entity ?? '',
  );
  const [dui, setDui] = useState<string>(billingData.dui ?? '');
  const [iva, setIva] = useState<string>(billingData.iva ?? '');

  const dispatch = useAppDispatch();

  const billConfirmation = () => {
    if (billing === BillingInfo.bill.finalConsumer) {
      if (dui.length === 0) {
        Alert.alert(
          Messages.titleMessage,
          Messages.requireDuiProfile,
          [
            {
              text: Messages.okButton,
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return;
      }
    }

    if (billing === BillingInfo.bill.fiscalCredit) {
      if (iva.length === 0) {
        Alert.alert(
          Messages.titleMessage,
          Messages.requireFiscalNumber,
          [
            {
              text: Messages.okButton,
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return;
      }
    }

    if (
      billing === BillingInfo.bill.fiscalCredit &&
      typePerson === BillingInfo.Person.natural &&
      dui.length === 0
    ) {
      Alert.alert(
        Messages.titleMessage,
        Messages.requireDuiProfile,
        [
          {
            text: Messages.okButton,
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
      return;
    }

    const newBill: BillInfo = {
      bill_type: billing,
      bill_entity: typePerson,
      dui: dui,
      iva: iva,
    };

    dispatch(setOrderUserBillingTemp({billingInfo: newBill}));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar titleText="Información de facturación" />
      <View style={styles.container}>
        <Text style={styles.descriptionText}>
          ¿Que tipo de facturación deseas?
        </Text>
        <View style={styles.billingContainer}>
          <SwitchControlButton
            personSelected={value => setTypePerson(value)}
            billSelected={value => setBilling(value)}
            setDui={setDui}
            setIva={setIva}
            dui={dui}
            iva={iva}
            bill={billing ?? ''}
            person={typePerson ?? ''}
          />
        </View>
      </View>
      <SubmitButton
        textButton="Continuar"
        customStyles={{marginBottom: 10, marginHorizontal: 40}}
        onPress={() => {
          billConfirmation();
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
  descriptionText: {
    fontSize: 12,
    color: colors.LightGrayColor,
    fontFamily: 'Poppins-Medium',
    paddingTop: 10,
  },
  billingContainer: {
    marginTop: 20,
  },
});
