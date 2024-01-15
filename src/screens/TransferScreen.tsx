import React, {useEffect, useState} from 'react';
import {
  Alert,
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

import ImagePicker from 'react-native-image-crop-picker';

import {useAppSelector} from '../hooks/useRedux';

import {CustomNavBar} from '../components/CustomNavBar';
import {SubmitButton} from '../components/SubmitButton';

import {LoaderScreen} from './LoaderScreen';

import {QuoteResponse} from '../model/Quote';
import {Bank} from '../model/bank';
import {BillInfo} from '../model/BillInfo';
import {
  Order,
  OrderRequestDTO,
  OrderCreateErrorResponse,
  OrderCreateResponse,
} from '../model/Order';
import {FileResponse} from '../model/File';

import {uploadFileService} from '../services/file';
import {getBanksService} from '../services/bank';
import {createOrderService, getOrderByIdService} from '../services/order/order';

import InfoCircleIcon from '../assets/info_circle.svg';

import {formatter} from '../utils/utilities';
import {isAndroid} from '../constants/Platform';
import Messages from '../constants/Messages';
import {billFormatOrderRequest} from '../helpers/billFormatOrderRequest';
import {showServiceErrors} from '../helpers/showServiceErrors';
import {colors} from '../styles/colors';

type BankItemRenderProps = {
  bank: Bank;
};

type ShowInfoBankProps = {
  bankData: Bank;
};

type ShowTotalInfoProps = {
  quote: QuoteResponse;
};

type FileData = {
  fileName?: string;
  filePath: string;
};

export const TransferScreen = ({navigation, route}: any) => {
  const {quoteData, billing, discountCode, phoneNumber} = route.params;

  const productsCart = useAppSelector(state => state.productsCart);
  const currentAddress = useAppSelector(state => state.currentAddress);
  const token = useAppSelector(state => state.authToken.token);
  const [quote] = useState<QuoteResponse>(quoteData);
  const [currentBilling] = useState<BillInfo>(billing);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [discountCodes] = useState<string>(discountCode);
  const [currentPhoneNumber] = useState<string>(phoneNumber);
  const [selectBank, setSelectBank] = useState<Bank>({} as Bank);
  const [fileData, setFileData] = useState<FileData>({
    filePath: '',
    fileName: '',
  });
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

  const getFile = async () => {
    ImagePicker.openPicker({
      cropping: false,
      mediaType: 'photo',
    })
      .then(image => {
        let path = image.path;

        setFileData({
          fileName: isAndroid
            ? path.substring(path.lastIndexOf('/') + 1)
            : image.filename,
          filePath: image.path,
        });
      })
      .catch(() => {
        if (fileData.filePath && fileData.filePath) return;
        setFileData({filePath: '', fileName: ''});
      });
  };

  const confirmOrder = async () => {
    setIsLoading(true);

    const responseFile = await uploadFileService(
      token,
      fileData.filePath,
      fileData.fileName ?? '',
    );
    if (responseFile.ok) {
      let fileIdRecent = (responseFile.data as FileResponse).id.toString();
      const orderReq: OrderRequestDTO = {
        addressId: currentAddress.address.id,
        branchId: productsCart.products[0].branch.id,
        products: productsCart.products,
        fileId: fileIdRecent,
        couponCode: discountCodes,
        method: 'transfer',
        billInfo: billFormatOrderRequest(currentBilling),
        phone: currentPhoneNumber,
      };

      const response = await createOrderService(token, orderReq);

      if (response.ok) {
        if ((response.data as OrderCreateErrorResponse).errors) {
          showServiceErrors((response.data as OrderCreateErrorResponse).errors);
          setIsLoading(false);
          return;
        }
        const AsyncAlert = async () =>
          new Promise(resolve => {
            Alert.alert(
              Messages.orderCreatedSuccessMessage,
              Messages.orderCreatedSuccessTransferMessage,
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

        await AsyncAlert();
        const resp = await getOrderByIdService(
          token,
          (response.data as OrderCreateResponse).order.id.toString(),
        );

        navigation.navigate('OrderDetailScreen', {
          order: resp.data as Order,
          navigationPath: 'HomeNavigation',
          resetRootNavigation: true,
          isOrderCreated: true,
        });
      }
    }

    setIsLoading(false);
  };

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

  const ShowTotalInfo = ({quote}: ShowTotalInfoProps) => {
    return (
      <View style={styles.subTotalContainer}>
        {[
          {label: 'Subtotal', value: quote.subtotal},
          {label: 'Costo de envío', value: quote.transport},
          {label: 'Ahorro', value: quote.discount},
          {label: 'Descuento Cupón', value: quote.promo},
          {label: 'Total', value: quote.total},
        ].map(item => (
          <View style={styles.subTotalItem} key={item.label}>
            {item.label === 'Costo de envío' ? (
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
            ) : (
              <Text
                style={[
                  styles.subTotalItemLabel,
                  {
                    color:
                      item.label === 'Total'
                        ? colors.PrimaryTextColor
                        : colors.DarkGrayColor,
                  },
                ]}>
                {item.label}
              </Text>
            )}

            <Text
              style={[
                styles.subTotalItemValue,
                {
                  color:
                    item.label === 'Total'
                      ? colors.SecondaryTextColor
                      : colors.LightGrayColor,
                },
              ]}>
              {item.label === 'Descuento Cupón'
                ? '-' + formatter.format(Number(item.value))
                : formatter.format(Number(item.value))}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const ShowInfoBank = ({bankData}: ShowInfoBankProps) => {
    return (
      <View style={styles.infoBankContainer}>
        {[
          {label: 'Nombre', value: bankData.name},
          {label: 'Tipo', value: bankData.type},
          {label: 'Número', value: bankData.number},
          {label: 'Banco', value: bankData.bank},
          {label: 'Tipo de persona', value: bankData.type},
        ].map(item => (
          <View style={styles.rowDataBank} key={item.label}>
            <Text style={styles.dataBankLabel}>{item.label}</Text>
            <Text style={styles.dataBankValue}>{item.value}</Text>
          </View>
        ))}
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
          <ShowTotalInfo quote={quoteData} />
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
            placeholder={
              fileData.fileName ? fileData.fileName : 'Adjunta tu comprobante'
            }
          />
          <SubmitButton
            textButton="Adjuntar"
            customStyles={{
              backgroundColor: colors.SecondaryColor,
              height: 40,
              paddingHorizontal: 20,
            }}
            customTextStyles={{fontSize: 13}}
            onPress={async () => await getFile()}
          />
        </View>
        <SubmitButton
          textButton="Adjuntar comprobante"
          activeOpacity={!fileData.filePath && !fileData.fileName ? 1 : 0.9}
          customStyles={{
            marginVertical: 20,
            backgroundColor:
              !fileData.filePath && !fileData.fileName
                ? colors.disbledButtonColor
                : colors.PrimaryColor,
          }}
          onPress={() => {
            if (!fileData.filePath && !fileData.fileName) return;
            confirmOrder();
          }}
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
