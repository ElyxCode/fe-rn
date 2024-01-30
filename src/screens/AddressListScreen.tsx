import React, {useEffect, useState} from 'react';
import {Alert, FlatList, SafeAreaView, Text, View} from 'react-native';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {AddButton} from '../components/AddButton';
import {AddressListCell} from '../components/AddressListCell';
import {CustomNavBar} from '../components/CustomNavBar';

import {LoaderScreen} from './LoaderScreen';
import {MapFlow} from './MapConfirmationScreen';

import {setAddress} from '../services/address/addressSlice';

import {Address} from '../model/Address';
import {
  DeleteAddress,
  ReadAll,
  UpdateAddress,
} from '../services/address/Address';
import Messages from '../constants/Messages';
import {colors} from '../styles/colors';

export const AddressListScreen = ({navigation, route}: any) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token} = useAppSelector(state => state.authToken);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  const {addressWassAdded, newAddress} = route.params ?? {};

  const getAddresses = async () => {
    setIsLoading(true);
    const response = await ReadAll(token);
    if (response.ok) {
      response.data?.sort((a, b) => a.id - b.id);
      setAddresses(response.data as Address[]);
      if (
        response.data?.length == 1 &&
        response.data.some(address => address.active === false)
      ) {
        let address = response.data.find(address => address.active == false);
        if (address) {
          setActiveFirstAddress(address);
        }
      }
    } else {
      console.log({error: response}, 'address error');
      setAddresses([] as Address[]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getAddresses();
    }
  }, [isFocused]);

  const setActiveFirstAddress = async (Address: Address) => {
    Address.active = true;
    const response = await UpdateAddress(token, Address);
    if (response.ok) {
      dispatch(setAddress(response.data?.address as Address));
    }
  };

  const setActiveAddress = async (currentAddress: Address) => {
    setIsLoading(true);

    if (currentAddress.active && !addressWassAdded) {
      navigation.goBack();
      setIsLoading(false);
      return;
    }

    if (addresses.some(x => x.active)) {
      let oldAddress = addresses.find(x => x.active);
      if (oldAddress) {
        oldAddress.active = false;

        const response = await UpdateAddress(token, oldAddress);
        if (response.ok) {
          const nuevasDirecciones = addresses.map(x =>
            x.id === oldAddress?.id ? {...x, active: false} : x,
          );
          setAddresses(nuevasDirecciones);
        }
      }
    }

    currentAddress.active = true;
    const respo = await UpdateAddress(token, currentAddress);
    if (respo.ok) {
      console.log(respo.data?.errors);
      const nuevasDirecciones = addresses.map(y =>
        y.id === currentAddress?.id ? {...y, active: true} : y,
      );
      setAddresses(nuevasDirecciones);
    }

    dispatch(setAddress(addresses.find(x => x.active) ?? ({} as Address)));
    navigation.goBack();
    setIsLoading(false);
  };

  const GoToCreateAddress = () => {
    navigation.navigate('MapConfirmationScreen', {
      mapFlow: MapFlow.AddressFlow,
    });
  };

  const DeleteItem = async ({address}: {address: Address}) => {
    setIsLoading(true);
    const response = await DeleteAddress(token, address.id.toString());
    if (response.ok) {
      Alert.alert(Messages.titleMessage, response.data?.message, [
        {text: Messages.okButton},
      ]);

      const resp = await ReadAll(token);
      if (resp.ok) {
        setAddresses((resp.data as Address[]) ?? []);
        if ((resp.data as Address[]).some(address => !address.active)) {
          let oldAddress = (resp.data as Address[]).find(
            address => !address.active,
          );
          if (oldAddress) {
            oldAddress.active = true;
            const response = await UpdateAddress(token, oldAddress);
            if (response.ok) {
              dispatch(setAddress(response.data?.address as Address));
            }
          }
        }
      } else {
        setAddresses([] as Address[]);
      }
    } else {
      Alert.alert(Messages.titleMessage, Messages.deleteAddressError, [
        {text: Messages.okButton},
      ]);
    }
    setIsLoading(false);
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <CustomNavBar titleText="Direcciones de envío"></CustomNavBar>

        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={addresses}
          renderItem={({item}) => (
            <AddressListCell
              onPress={() => setActiveAddress(item)}
              address={item}
              onPressDelete={() => DeleteItem({address: item})}
            />
          )}
          ListEmptyComponent={() => (
            <View style={{alignItems: 'center', marginVertical: 15}}>
              <Text style={{color: colors.LightGrayColor}}>
                No tienes direcciones
              </Text>
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{width: 12, backgroundColor: 'red'}}></View>
          )}
        />

        <AddButton
          text="Agregar dirección"
          onPress={GoToCreateAddress}></AddButton>
      </SafeAreaView>
    </>
  );
};
