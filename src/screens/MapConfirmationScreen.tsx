import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AddressBox} from '../components/AddressBox';
import {SubmitButton} from '../components/SubmitButton';
import {colors} from '../styles/colors';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Region,
  Details,
} from 'react-native-maps';
import GetLocation from 'react-native-get-location';

import {getPlaceDetails, getReverseGeocoding} from '../services/google/maps';
import {Location} from '../model/Location';
import {useDispatch} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../hooks/useRedux';
import {setCurrentLocationGlobal} from '../services/google/locationSlice';
import {GooglePlaceAutoCompleteResult} from '../model/GooglePlaceAutoCompleteResult';

import {first} from 'lodash';

export const MapConfirmationScreen = ({navigation}: any) => {
  const [isLoading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const dispatch = useAppDispatch();
  const currentLocationGlobal = useAppSelector(
    state => state.currentLocation.currentLocation,
  );

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

  const getCurrentLocation = async () => {
    let location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 6000,
    });
    if (location !== null) {
      return location;
    }

    return {latitude: 13.701404423436982, longitude: -89.2244389412076};
  };

  const setLocation = async (location: Location, addressString?: string) => {
    setLoading(true);
    setMarkers([
      {
        latitude: location.latitude,
        longitude: location.longitude,
        title: location.title!,
        description: location.description!,
      },
    ]);

    const region = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    setRegion(region);

    console.log(location.latitude, location.longitude);

    if (addressString === undefined || addressString === '') {
      const response = await getReverseGeocoding(
        location.latitude,
        location.longitude,
      );
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
    dispatch(setCurrentLocationGlobal({...currentLocation!}));
    await navigation.navigate('HomeNavigation');
  };

  useEffect(() => {
    (async () => {
      console.log('location');
      const location = await getCurrentLocation();
      setLocation({latitude: location.latitude, longitude: location.longitude});
    })();
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <MapView
            onPoiClick={e =>
              setLocation(e.nativeEvent.coordinate, e.nativeEvent.name)
            }
            onPress={e => {
              setLocation(e.nativeEvent.coordinate);
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

        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Confirma tu dirección de entrega</Text>
          <Text style={styles.description}>
            Queremos mostrate los productos disponibles para tu zona
          </Text>

          {isLoading ? (
            <AddressBox
              onPress={() =>
                navigation.navigate('SearchAddressScreen', {setLocation})
              }
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
              confirm();
            }}
          />
        </View>
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
