import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {CustomTextInput} from './CustomTextInput';

import PersonalCardIcon from '../assets/personalcard.svg';
import ReceiptEditIcon from '../assets/receipt_edit.svg';

import {colors} from '../styles/colors';
import {isAndroid} from '../constants/Platform';

type SwitchBillControlButtonProps = {
  billSelected: (value: string) => void;
  setDui: React.Dispatch<React.SetStateAction<string>>;
  setIva: React.Dispatch<React.SetStateAction<string>>;
  dui: string;
  iva: string;
  personSelected: (value: string) => void;
  bill: string;
  person: string;
};

type BillingButtonProps = {
  name: string;
  value: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

export const BillingInfoLabel = {
  bill: {
    finalConsumer: 'Consumidor final',
    fiscalCredit: 'Crédito fiscal',
  },
  Person: {
    natural: 'Natural',
    juridico: 'Jurídico',
  },
};

export const BillingInfo = {
  bill: {
    finalConsumer: 'final',
    fiscalCredit: 'credit',
  },
  Person: {
    natural: 'natural',
    juridico: 'juridica',
  },
};

export const SwitchBillControlButton = ({
  billSelected,
  setDui,
  setIva,
  dui,
  iva,
  personSelected,
  bill,
  person,
}: SwitchBillControlButtonProps) => {
  const [selectedBilling, setSelectedBilling] = useState<string>(bill);
  const [selectedTypePerson, setSelectedTypePerson] = useState<string>(person);

  useEffect(() => {
    if (selectedBilling === BillingInfo.bill.finalConsumer) {
      billSelected(selectedBilling);
    } else if (selectedBilling === BillingInfo.bill.fiscalCredit) {
      billSelected(selectedBilling);

      personSelected(selectedTypePerson);
    }
  }, []);

  useEffect(() => {
    billSelected(selectedBilling);
  }, [selectedBilling]);

  useEffect(() => {
    personSelected(selectedTypePerson);
  }, [selectedTypePerson]);

  const BillingButton = ({
    name,
    value,
    selected,
    setSelected,
  }: BillingButtonProps) => {
    return (
      <Pressable
        onPress={() => {
          setSelected(value);
        }}>
        <View
          style={[
            styles.buttonContainer,
            {
              backgroundColor:
                selected === value ? colors.SecondaryColor : colors.White,
              borderColor:
                selected === value
                  ? colors.SecondaryColor
                  : colors.PrimaryColor,
            },
          ]}>
          <Text
            style={[
              styles.buttonTitleText,
              {
                color:
                  selected === value ? colors.White : colors.PrimaryTextColor,
              },
            ]}>
            {name}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <BillingButton
          name={'Consumidor\n        final'}
          value={BillingInfo.bill.finalConsumer}
          selected={selectedBilling}
          setSelected={setSelectedBilling}
        />
        <BillingButton
          name={BillingInfoLabel.bill.fiscalCredit}
          value={BillingInfo.bill.fiscalCredit}
          selected={selectedBilling}
          setSelected={setSelectedBilling}
        />
      </View>
      <View style={styles.inputDocumentNumberContainer}>
        {selectedBilling === BillingInfo.bill.finalConsumer ? (
          <CustomTextInput
            keyboardType={isAndroid ? 'numeric' : 'number-pad'}
            onChangeText={setDui}
            value={dui}
            InputIcon={PersonalCardIcon}
          />
        ) : (
          <CustomTextInput
            keyboardType={isAndroid ? 'numeric' : 'number-pad'}
            onChangeText={setIva}
            value={iva}
            InputIcon={ReceiptEditIcon}
          />
        )}
      </View>
      {selectedBilling === BillingInfo.bill.fiscalCredit ? (
        <View style={styles.personTypeContainer}>
          <Text style={styles.inputTitleText}>Tipo de Persona</Text>
          <View style={styles.buttonsContainer}>
            <BillingButton
              name={BillingInfoLabel.Person.natural}
              value={BillingInfo.Person.natural}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
            <BillingButton
              name={BillingInfoLabel.Person.juridico}
              value={BillingInfo.Person.juridico}
              selected={selectedTypePerson}
              setSelected={setSelectedTypePerson}
            />
          </View>
          {selectedTypePerson === BillingInfo.Person.natural ? (
            <View style={styles.inputDocumentNumberContainer}>
              <CustomTextInput
                keyboardType={isAndroid ? 'numeric' : 'number-pad'}
                InputIcon={PersonalCardIcon}
                onChangeText={setDui}
                value={dui}
              />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: colors.White,
  },
  buttonTitleText: {
    color: colors.PrimaryTextColor,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  inputDocumentNumberContainer: {
    marginBottom: 20,
    marginTop: 5,
  },
  inputTitleText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.PrimaryColor,
    marginBottom: 15,
  },
  personTypeContainer: {
    marginBottom: 10,
  },
});
