import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAppSelector} from '../hooks/useRedux';
import {useNavigation} from '@react-navigation/native';

import {CustomNavBar} from '../components/CustomNavBar';
import {PlaceCell} from '../components/PlaceCell';

import {getPlaceDetails, getPlaces} from '../services/google/maps';
import {
  GooglePlaceAutoCompletePrediction,
  GooglePlaceAutoCompleteResult,
} from '../model/GooglePlaceAutoCompleteResult';
import {Location} from '../model/Location';

import LocationIcon from '../assets/location.svg';
import GoogleIcon from '../assets/poweredbygoogle.svg';
import CloseCircle from '../assets/close_circle.svg';

import {colors} from '../styles/colors';

export const SearchAddressScreen = ({route}: any) => {
  const {setLocation} = route.params;

  const navigation = useNavigation();
  const authToken = useAppSelector(state => state.authToken);
  const [isButtonVisible, setButtonVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] =
    useState<GooglePlaceAutoCompleteResult>();

  const textChanged = async (e: string) => {
    setInputValue(e);
    if (e.length >= 3) {
      const result = await getPlaces(e);
      setPredictions(result.data);
      setButtonVisible(true);
    } else setButtonVisible(false);
  };

  const clearText = () => {
    setInputValue('');
    setButtonVisible(false);
  };

  const selectedPlace = async (item: GooglePlaceAutoCompletePrediction) => {
    const googlePlace = await getPlaceDetails(item.place_id);

    const location: Location = {
      lat: googlePlace.data?.result.geometry.location.lat!,
      lng: googlePlace.data?.result.geometry.location.lng!,
    };
    await setLocation(location, item.structured_formatting.main_text);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <View style={styles.container}>
        {authToken.isLoggedIn ? (
          <Text style={styles.title}>Editar dirección</Text>
        ) : (
          <Text style={styles.title}>Buscar dirección</Text>
        )}
        <View style={styles.searchContainer}>
          <View style={styles.leftContainer}>
            <LocationIcon height={24} width={24} />
            <TextInput
              value={inputValue}
              onChangeText={e => textChanged(e)}
              numberOfLines={1}
              style={styles.text}></TextInput>
          </View>
          {isButtonVisible ? (
            <TouchableOpacity onPress={clearText}>
              <CloseCircle height={16} width={16} />
            </TouchableOpacity>
          ) : (
            ''
          )}
        </View>
        <View style={styles.googleContainer}>
          <Text style={{fontSize: 12, color: colors.Black}}>Powered by</Text>
          <GoogleIcon height={15} width={55} style={{top: 2}} />
        </View>

        <FlatList
          data={predictions?.predictions}
          renderItem={({item, index}) => (
            <PlaceCell
              item={item}
              onPress={() => {
                selectedPlace(item);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  googleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  container: {
    marginHorizontal: 40,
  },
  leftContainer: {
    flex: 1, // Esto hace que los elementos en este contenedor ocupen todo el espacio disponible
    flexDirection: 'row', // Esto coloca los elementos en una fila horizontal
    alignItems: 'center', // Esto alinea verticalmente los elementos al centro
    justifyContent: 'flex-start', // Esto alinea los elementos a la izquierda del contenedor
  },
  title: {
    color: colors.PrimaryColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
  },
  text: {
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 21,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
    backgroundColor: colors.White,
    borderRadius: 10,
  },
});
