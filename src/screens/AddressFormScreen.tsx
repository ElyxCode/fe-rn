import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import {CustomNavBar} from '../components/CustomNavBar';
import {CustomTextInput} from '../components/CustomTextInput';
import LocationIcon from '../assets/location.svg';
import {colors} from '../styles/colors';
import {SwitchSlopeComponent} from '../components/SwitchSlopComponent';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SubmitButton} from '../components/SubmitButton';
import {useForm, Controller} from 'react-hook-form';

import {useAppSelector} from '../hooks/useRedux';
import {Address} from '../model/Address';
import {Navigation} from '../navigator/Navigation';
import {showServiceErrors} from '../helpers/showServiceErrors';
import {MapFlow} from './MapConfirmationScreen';
import {Location} from '../model/Location';
import {CreateAddress} from '../services/address/Address';

type RoadData = {
  id: string;
  selected: boolean;
  road: string;
};

const Roads: RoadData[] = [
  {id: '0', road: 'Asfalto', selected: true},
  {id: '1', road: 'Tierra', selected: false},
];

type RoadProps = {
  item: RoadData;
  onPress: (isChecked: boolean) => void;
};

const Item = ({item, onPress}: RoadProps) => {
  let bouncyCheckboxRef: BouncyCheckbox | null = null;
  const [checkboxState, setCheckboxState] = useState(item.selected);

  return (
    <View style={{paddingBottom: 19, paddingTop: 5}}>
      <BouncyCheckbox
        ref={(ref: any) => (bouncyCheckboxRef = ref)}
        isChecked={checkboxState}
        size={16}
        fillColor={colors.SecondaryColor}
        unfillColor="white"
        text={item.road}
        iconStyle={{borderRadius: 0}}
        innerIconStyle={{
          borderWidth: 1,
          borderRadius: 0,
          borderColor: checkboxState
            ? colors.SecondaryColor
            : colors.PrimaryColor,
        }}
        textStyle={{fontFamily: 'Poppins-Regular', textDecorationLine: 'none'}}
        onPress={(isChecked: boolean) => {
          onPress(isChecked);
          setCheckboxState(isChecked);
          console.log(isChecked);
        }}></BouncyCheckbox>
    </View>
  );
};

interface RouteParams {
  selectedLocation: Location;
  // Add other properties if applicable
}

export const AddressFormScreen = ({route, navigation}: any) => {
  const {selectedLocation} = route.params as RouteParams;
  const {token, social} = useAppSelector(state => state.authToken);
  const [roads, setRoads] = useState(Roads);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(selectedLocation, 'current location form');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      address: selectedLocation?.title,
      block: '',
      slope: false,
      road: '',
      comments: '',
    },
  });

  const handleOnSubmit = async ({
    name,
    address,
    block,
    slope,
    road,
    comments,
  }: {
    name: string;
    address?: string;
    block: string;
    slope: boolean;
    road: string;
    comments: string;
  }) => {
    let localRoad = '';
    if (
      (roads[0].selected && roads[1].selected) ||
      (!roads[0].selected && roads[0].selected)
    ) {
      localRoad = 'tierra';
    } else if (roads[0].selected && !roads[1].selected) {
      localRoad = 'asfalto';
    }

    console.log(localRoad);
    const addressrequest: Address = {
      id: 0,
      name: name,
      address: address ? address : '',
      block: block,
      slope: slope,
      road: localRoad,
      comments: comments,
      location: selectedLocation,
      active: false,
    };

    const response = await CreateAddress(token, addressrequest);

    if (response.ok) {
      if (response.data?.errors) {
        showServiceErrors(response.data?.errors);
        setIsLoading(false);
        return;
      }
      console.log(response.data);
      await navigation.navigate('AddressListScreen', {
        addressWassAdded: true,
        newAddress: response.data?.address,
      });
    }
  };

  const renderItem = ({item}: {item: RoadData}) => {
    return (
      <Item
        item={item}
        onPress={(isChecked: boolean) => {
          const updatedRoads = roads.map(road =>
            road.id === item.id ? {...road, selected: isChecked} : road,
          );

          setRoads(updatedRoads);
          console.log(updatedRoads);
        }}
      />
    );
  };

  const handleOnError = (errors: any) => {
    console.log(errors);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <CustomNavBar />

          <View style={styles.container}>
            <Text style={styles.screenTitle}>Nueva dirección</Text>

            <View style={styles.inputBoxContainer}>
              <Text style={styles.titleBox}>Nombre de dirección</Text>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    isPassword={false}
                    placeHolder="Ej: Casa"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="name"
              />
            </View>

            <View style={styles.inputBoxContainer}>
              <Text style={styles.titleBox}>Dirección</Text>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    InputIcon={LocationIcon}
                    isPassword={false}
                    placeHolder=""
                    editable={true}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="address"
              />
            </View>

            <View style={styles.inputBoxContainer}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    isPassword={false}
                    placeHolder="Nro. de apartamento/Casa/Local"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="block"
              />
            </View>

            <View style={styles.inputBoxContainer}>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <SwitchSlopeComponent
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="slope"
              />
            </View>

            <Text style={styles.titleBox}>
              Tipo de calle (Puedes escoger más de una opción){' '}
            </Text>

            <FlatList
              data={roads}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />

            <View style={styles.inputBoxContainer}>
              <Text style={styles.titleBox}>Indicaciones de entrega</Text>
              <Controller
                control={control}
                render={({field: {onChange, value, onBlur}}) => (
                  <CustomTextInput
                    isPassword={false}
                    placeHolder="Ej: Tocar el timbre"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                )}
                name="comments"
              />
            </View>

            <SubmitButton
              textButton="Guardar"
              onPress={handleSubmit(handleOnSubmit, handleOnError)}
              customStyles={{marginBottom: 10}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  screenTitle: {
    color: colors.PrimaryColor,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    paddingBottom: 21,
  },
  titleBox: {
    color: colors.PrimaryColor,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  inputBoxContainer: {
    paddingBottom: 19,
  },
  listContainer: {},
});
