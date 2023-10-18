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
import GetLocation from 'react-native-get-location'

interface Location  {
    latitude: number,
    longitude:number,
    title?:string,
    description?:string

}

export const MapConfirmationScreen = () => {
   

  const [region, setRegion] = useState({
    latitude: 13.7012696,
    longitude: -89.2253804,
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
  };
}

  const getCurrentLocation = async  () => {
    try{ 
   const location =  await  GetLocation.getCurrentPosition({ enableHighAccuracy:true, timeout:6000 });
    console.log('location',location)
   return location;
     }catch (error )
      {
  console.log(error)
     } 
  };

  const setLocation =  (location: Location) => {
    console.log('settlocation')
    setMarkers([
        {
          latitude: location.latitude,
          longitude: location.longitude,
          title: location.title! ,
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
      
  };

  useEffect(() => {
    (async () => {
      console.log('location');
      const location = await getCurrentLocation();
      setLocation({ latitude: location.latitude, longitude: location.longitude });
    })();
  }, []);

  return (
    <>
      <View style={{flex: 1}}>
        <View style={styles.headerContainer}>
          <MapView
          
           
          onPress={e => {
           
            const location : Location = {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                title: '',
                description:''

             }
            
              setLocation(location)
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
              />
            ))}
          </MapView>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Confirma tu dirección de entrega</Text>
          <Text style={styles.description}>
            Queremos mostrate los productos disponibles para tu zona
          </Text>
          <AddressBox
            customStyles={styles.addressBox}
            textButton={markers[0]?.title}></AddressBox>
          <SubmitButton textButton="Confirmar dirección" />
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

