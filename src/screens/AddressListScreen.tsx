import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {AddButton} from '../components/AddButton';
import {AddressListCell} from '../components/AddressListCell';
import {CustomNavBar} from '../components/CustomNavBar';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {Address} from '../model/Address';
import {
  DeleteAddress,
  ReadAll,
  UpdateAddress,
} from '../services/address/Address';

import {LoaderScreen} from './LoaderScreen';
import {MapFlow} from './MapConfirmationScreen';
import {setAddress} from '../services/address/addressSlice';

export const AddressListScreen = ({navigation, route}: any) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token} = useAppSelector(state => state.authToken);
  const dispatch = useAppDispatch();

  const {addressWassAdded = false, newAddress = {}} = route.params ?? {};

  const getAddresses = async () => {
    setIsLoading(true);
    const response = await ReadAll(token);
    if (response.ok) {
      response.data?.sort((a, b) => a.id - b.id);
      setAddresses(response.data as Address[]);
      //TEMP
      dispatch(
        setAddress(response.data?.find(x => x.active) ?? ({} as Address)),
      );
    } else {
      console.log({error: response}, 'address error');
    }

    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (addressWassAdded) {
        setAddresses(prevAddresses => [...prevAddresses, newAddress]);
        if (addresses?.length == 1) {
          setActiveAddress(addressWassAdded);
        }
      } else {
        getAddresses();
      }
    }, []),
  );

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
    const response = await DeleteAddress(token, address.id.toString());
    if (response.ok) {
      const newAddressList: Address[] = addresses.filter(
        item => item.id !== address.id,
      );
      setAddresses(newAddressList);
    }
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
