import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert, Linking} from 'react-native';

import {first} from 'lodash';
import GetLocation from 'react-native-get-location';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {AddressBox} from '../components/AddressBox';
import {SubmitButton} from '../components/SubmitButton';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Region,
  Details,
} from 'react-native-maps';

import {getReverseGeocoding} from '../services/google/maps';
import {setCurrentLocationGlobal} from '../services/google/locationSlice';

import {Location} from '../model/Location';

import Messages from '../constants/Messages';
import {isAndroid} from '../constants/Platform';
import {colors} from '../styles/colors';

export enum MapFlow {
  HomeFlow,
  AddressFlow,
  WelcomeFlow,
}

const defaultAddress = {
  latitude: 13.701404423436982,
  longitude: -89.2244389412076,
  title: 'Salvador del mundo',
  description: '',
};
export interface MapconfirmationProps {
  mapFlow: MapFlow;
}

export const MapConfirmationScreen = ({navigation, route}: any) => {
  const [isLoading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const dispatch = useAppDispatch();
  const currentLocationGlobal = useAppSelector(
    state => state.currentLocation.currentLocation,
  );
  const {mapFlow} = route.params;

  const [region, setRegion] = useState({
    latitude: 13.701404423436982,
    longitude: -89.2244389412076,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const [markers, setMarkers] = useState([
    {
      latitude: 13.701404423436982,
      longitude: -89.2244389412076,
      title: '',
      description: '',
    },
  ]);

  const onRegionChangeComplete = (region: Region, details: Details) => {
    console.log('onregion change');
    if (!details.isGesture) {
      return;
    }
  };

  const setLocation = async (location: Location, addressString?: string) => {
    setLoading(true);
    setMarkers([
      {
        latitude: location.lat,
        longitude: location.lng,
        title: location.title!,
        description: location.description!,
      },
    ]);

    const region = {
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    setRegion(region);

    console.log(location.lat, location.lng);

    if (addressString === undefined || addressString === '') {
      const response = await getReverseGeocoding(location.lat, location.lng);
      if (response.ok) {
        var addressText = first(
          response.data?.results ?? [],
        )?.formatted_address;

        // Toma la dirección del primer resultado

        console.log(addressText, 'address');
        location.description = addressText;
        location.title = addressText;
      }
    } else {
      location.description = addressString;
      location.title = addressString;
    }

    setCurrentLocation(location);

    setLoading(false);
  };

  const confirm = async () => {
    switch (mapFlow) {
      case MapFlow.WelcomeFlow:
        dispatch(setCurrentLocationGlobal({...currentLocation!}));
        await navigation.navigate('HomeNavigation');
        break;

      case MapFlow.AddressFlow:
        await navigation.navigate('AddressFormScreen', {
          selectedLocation: currentLocation,
        });
        break;

      case MapFlow.HomeFlow:
        dispatch(setCurrentLocationGlobal({...currentLocation!}));
        await navigation.goBack();
        break;
      default:
        console.log('Unknown flow');
        break;
    }
  };

  useEffect(() => {
    (async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          setLocation({lat: location.latitude, lng: location.longitude});
        })
        .catch(error => {
          const {code, message} = error;
          showAlertsPermissions(code);
          setLocation(
            {lat: defaultAddress.latitude, lng: defaultAddress.longitude},
            defaultAddress.title,
          );
        });
    })();
  }, []);

  const showAlertsPermissions = async (code: string) => {
    if (code === 'UNAUTHORIZED') {
      await CustomAlert(Messages.requestLocationPermission);
      if (isAndroid) {
        Linking.openSettings();
      } else {
        Linking.sendIntent('android.settings.SETTINGS');
      }
      return;
    }

    if (code === 'UNAVAILABLE') {
      await CustomAlert(Messages.activeGpsMessages);
      if (isAndroid) {
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
      } else {
        Linking.openURL('App-Prefs:Privacy&path=LOCATION');
      }
      return;
    }
  };

  const CustomAlert = async (message: string) =>
    new Promise(resolve => {
      Alert.alert(
        Messages.titleMessage,
        message,
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

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <MapView
            onPoiClick={e =>
              setLocation(
                {
                  lat: e.nativeEvent.coordinate.latitude,
                  lng: e.nativeEvent.coordinate.longitude,
                },
                e.nativeEvent.name,
              )
            }
            onPress={e => {
              setLocation({
                lat: e.nativeEvent.coordinate.latitude,
                lng: e.nativeEvent.coordinate.longitude,
              });
            }}
            style={styles.map}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            region={region}
            onRegionChangeComplete={onRegionChangeComplete}>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.title}
                image={{uri: 'ic_location_pin'}}
              />
            ))}
          </MapView>
        </View>

        <ScrollView
          style={styles.bottomContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Confirma tu dirección de entrega</Text>
          <Text style={styles.description}>
            Queremos mostrate los productos disponibles para tu zona
          </Text>

          {isLoading ? (
            <AddressBox
              onPress={() => {
                if (isLoading) return;
                navigation.navigate('SearchAddressScreen', {setLocation});
              }}
              customStyles={styles.addressBox}
              textButton={'Buscando...'}></AddressBox>
          ) : (
            <AddressBox
              onPress={() => {
                console.log('hola');
                navigation.navigate('SearchAddressScreen', {setLocation});
              }}
              customStyles={styles.addressBox}
              textButton={
                currentLocation?.description == undefined
                  ? 'no encontrado'
                  : currentLocation?.description
              }></AddressBox>
          )}
          <SubmitButton
            textButton="Confirmar dirección"
            onPress={() => {
              if (isLoading) return;
              confirm();
            }}
            customStyles={{marginBottom: 28}}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
  },
  bottomContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: 'white',
  },
  title: {
    paddingBottom: 4,
    color: colors.PrimaryColor,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    paddingBottom: 22,
    color: colors.DarkGrayColor,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  addressBox: {
    marginBottom: 22,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
