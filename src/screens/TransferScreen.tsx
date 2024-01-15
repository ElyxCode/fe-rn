import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {CustomNavBar} from '../components/CustomNavBar';
import {SubmitButton} from '../components/SubmitButton';

import {LoaderScreen} from './LoaderScreen';

import {QuoteResponse} from '../model/Quote';
import {Bank} from '../model/bank';

import {getBanksService} from '../services/bank';

import InfoCircleIcon from '../assets/info_circle.svg';

import {formatter} from '../utils/utilities';
import {colors} from '../styles/colors';

type BankItemRenderProps = {
  bank: Bank;
};

type ShowInfoBankProps = {
  bankData: Bank;
};

export const TransferScreen = ({navigation, route}: any) => {
  const {quoteData} = route.params;
  const [quote] = useState<QuoteResponse>(quoteData);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectBank, setSelectBank] = useState<Bank>({} as Bank);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const getBanks = async () => {
      setIsLoading(true);
      const response = await getBanksService();
      if (response.ok) {
        setBanks(response.data as Bank[]);
        setSelectBank(response.data?.find(i => i) as Bank);
      }

      setIsLoading(false);
    };

    getBanks();
  }, []);

  const BankItemRender = ({bank}: BankItemRenderProps) => {
    return (
      <Pressable onPress={() => setSelectBank(bank)}>
        <View
          style={[
            styles.bankItemContainer,
            {
              borderWidth: bank.id === selectBank.id ? 1 : 0,
              borderColor:
                bank.id === selectBank.id
                  ? colors.SecondaryTextColor
                  : 'transparent',
            },
          ]}>
          <Image
            source={{uri: bank.avatar}}
            style={{
              width: 120,
              height: 40,
              borderRadius: 10,
            }}
            resizeMode="contain"
          />
        </View>
      </Pressable>
    );
  };

  const ShowInfoBank = ({bankData}: ShowInfoBankProps) => {
    return (
      <View style={styles.infoBankContainer}>
        <View style={styles.rowDataBank}>
          <Text style={styles.dataBankLabel}>Nombre</Text>
          <Text style={styles.dataBankValue}>{bankData.name}</Text>
        </View>
        <View style={styles.rowDataBank}>
          <Text style={styles.dataBankLabel}>Tipo</Text>
          <Text style={styles.dataBankValue}>{bankData.type}</Text>
        </View>
        <View style={styles.rowDataBank}>
          <Text style={styles.dataBankLabel}>Número</Text>
          <Text style={styles.dataBankValue}>{bankData.number}</Text>
        </View>
        <View style={styles.rowDataBank}>
          <Text style={styles.dataBankLabel}>Banco</Text>
          <Text style={styles.dataBankValue}>{bankData.bank}</Text>
        </View>
        <View style={styles.rowDataBank}>
          <Text style={styles.dataBankLabel}>Tipo de persona</Text>
          <Text style={styles.dataBankValue}>{bankData.person_type}</Text>
        </View>
      </View>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={styles.container}>
        <Text style={styles.transferTitleText}>Realiza tu transferencia</Text>
        <Text style={styles.transferDescriptionText}>
          Adjunta el comprobante de tu transferencia, revisaremos la información
          para confirmar tu orden.
        </Text>
        <View style={styles.subTotalContainer}>
          <View style={styles.subTotalItem}>
            <Text style={styles.subTotalItemLabel}>Subtotal</Text>
            <Text style={styles.subTotalItemValue}>
              {formatter.format(Number(quote.subtotal))}
            </Text>
          </View>
          <View style={styles.subTotalItem}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 5,
              }}>
              <Text style={styles.subTotalItemLabel}>Costo de envío</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('DeliveryInfoModal' as never)
                }>
                <InfoCircleIcon width={17} height={17} />
              </Pressable>
            </View>
            <Text style={styles.subTotalItemValue}>
              {formatter.format(Number(quote.transport))}
            </Text>
          </View>
          <View style={styles.subTotalItem}>
            <Text style={styles.subTotalItemLabel}>Ahorro</Text>
            <Text style={styles.subTotalItemValue}>
              {formatter.format(Number(quote.discount))}
            </Text>
          </View>
          <View style={styles.subTotalItem}>
            <Text style={styles.subTotalItemLabel}>Descuento Cupón</Text>
            <Text style={styles.subTotalItemValue}>
              -{formatter.format(Number(quote.promo))}
            </Text>
          </View>
          <View style={styles.subTotalItem}>
            <Text
              style={[
                styles.subTotalItemLabel,
                {color: colors.PrimaryTextColor, fontSize: 16, paddingTop: 10},
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.subTotalItemValue,
                {color: colors.SecondaryTextColor},
              ]}>
              {formatter.format(Number(quote.total))}
            </Text>
          </View>
        </View>
        <View style={styles.bankListContainer}>
          <FlatList
            horizontal={true}
            data={banks}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <BankItemRender bank={item} />}
            ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={{paddingTop: 10}}>
          <ShowInfoBank bankData={selectBank} />
        </View>
        <View style={styles.fileContainer}>
          <TextInput
            editable={false}
            style={styles.fileInput}
            placeholder="Adjunta tu comprobante"
          />
          <SubmitButton
            textButton="Adjuntar"
            customStyles={{
              backgroundColor: colors.SecondaryColor,
              height: 40,
              paddingHorizontal: 20,
            }}
            customTextStyles={{fontSize: 13}}
          />
        </View>
        <SubmitButton
          textButton="Adjuntar comprobante"
          customStyles={{marginVertical: 20}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 40,
  },
  transferTitleText: {
    fontSize: 24,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
    marginBottom: 10,
  },
  transferDescriptionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  subTotalContainer: {
    paddingTop: 25,
    rowGap: 5,
  },
  subTotalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subTotalItemLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  subTotalItemValue: {
    color: colors.LightGrayColor,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  bankListContainer: {
    paddingTop: 20,
  },
  bankItemContainer: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: colors.White,
    alignItems: 'center',
  },
  infoBankContainer: {
    marginTop: 20,
    backgroundColor: colors.White,
    borderRadius: 10,
    padding: 10,
    rowGap: 8,
  },
  rowDataBank: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dataBankLabel: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.DarkGrayColor,
  },
  dataBankValue: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
  },
  fileContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
    height: 40,
  },
  fileInput: {
    backgroundColor: colors.White,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.PrimaryColor,
    flex: 1,
    textAlign: 'center',
  },
});
