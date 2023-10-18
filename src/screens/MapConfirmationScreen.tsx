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
import Geocoder from 'react-native-geocoding';
import { navigateToScreen } from '../helpers/NavigateToScreen';

interface Location  {
    latitude: number,
    longitude:number,
    title?:string,
    description?:string

}

export const MapConfirmationScreen = ({navigation}: any) => {
    
    const [isLoading, setLoading] = useState(true);
    const [currentLocation, setCurrentLocation] = useState<Location>();
   

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
  };
}

  const getCurrentLocation = async  () => {

   let location =  await  GetLocation.getCurrentPosition({ enableHighAccuracy:true, timeout:6000 });
   if(location !== null){
    return location;
   }
  
   return { latitude: 13.701404423436982, longitude:  -89.2244389412076 };
 
    
  };

  const setLocation = async (location: Location) => {
    console.log('settlocation')

    setLoading(true);
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

     const geoReponse = await Geocoder.from(location.latitude, location.longitude);
  
     const address =  geoReponse.results[0].formatted_address
     
     location.description= address.split(',')[0];
     location.title = address.split(',')[0];
     
     setCurrentLocation(location)

     setLoading(false)


      
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

          {isLoading  ? (
             <AddressBox
             onPress={() => navigation.navigate('SearchAddressScreen')}
             customStyles={styles.addressBox}
             textButton={'Buscando...'}></AddressBox>
      ) : (
        <AddressBox
        onPress={() => { 
            console.log('hola')
            navigation.navigate('SearchAddressScreen')}}
        customStyles={styles.addressBox}
        textButton={ currentLocation?.description == undefined ? 'no encontrado': currentLocation?.description}
        
        ></AddressBox>
      )}
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

