import React from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useAppSelector} from '../hooks/useRedux';

import CloseCircleIcon from '../assets/close_circle.svg';
import RatingIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';
import LocationIcon from '../assets/location.svg';

import {Branch} from '../model/Branch';

import {getDistanceUserToBranch} from '../utils/utilities';
import {colors} from '../styles/colors';

export const BranchInfoModal = ({route}: any) => {
  const {
    address,
    name,
    rating,
    delivery_time,
    description,
    location,
    distance,
    schedule,
    phone,
  } = route.params as Branch;

  const navigation = useNavigation();
  const currentLocation = useAppSelector(
    state => state.currentLocation.currentLocation,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.popUpContainer}>
        <View style={styles.closeButtonContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <CloseCircleIcon height={25} width={25} />
          </Pressable>
        </View>
        <View style={styles.popUpBody}>
          <Text style={styles.BranchNameText}>{name}</Text>
          <View style={styles.branchInfoContainer}>
            <View style={styles.ratingDeliveryContainer}>
              <View style={styles.ratingDelivery}>
                <RatingIcon height={14} width={14} />
                <Text style={styles.ratingDeliveryText}>{rating}</Text>
              </View>
              <View style={styles.ratingDelivery}>
                <TruckIcon height={14} width={14} />
                <Text style={styles.ratingDeliveryText}>{delivery_time}</Text>
              </View>
            </View>
            <View style={styles.distance}>
              <LocationIcon height={14} width={14} />
              <Text style={styles.distanceText}>
                a{' '}
                {getDistanceUserToBranch(
                  location.lat,
                  location.lng,
                  currentLocation.lat,
                  currentLocation.lng,
                )
                  .toFixed(2)
                  .toString()}{' '}
                km. de ti
              </Text>
            </View>
            <Text style={styles.branchDescription}>{description}</Text>
          </View>
          <View style={styles.addressSchedulesTelContainer}>
            <View style={styles.infoContainer}>
              <Text style={styles.labelInfoText}>Dirección</Text>
              <Text style={styles.InfoText}>{address}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.labelInfoText}>Horarios</Text>
              <Text style={styles.InfoText}>{schedule}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.labelInfoText}>Teléfono</Text>
              <Text style={styles.InfoText}>{phone}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.PopUpBackground,
  },
  popUpContainer: {
    backgroundColor: colors.White,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
  },
  popUpBody: {
    rowGap: 20,
    paddingHorizontal: 30,
  },
  BranchNameText: {
    fontSize: 20,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-SemiBold',
  },
  branchInfoContainer: {
    paddingTop: 10,
    rowGap: 10,
  },
  ratingDeliveryContainer: {
    flexDirection: 'row',
    columnGap: 15,
    alignItems: 'center',
  },
  ratingDelivery: {
    flexDirection: 'row',
    columnGap: 5,
    alignItems: 'center',
  },
  ratingDeliveryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.PrimaryTextColor,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
  },
  distanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.PrimaryTextColor,
  },
  branchDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.DarkGrayColor,
  },
  addressSchedulesTelContainer: {
    paddingTop: 10,
    rowGap: 25,
    paddingBottom: 30,
  },
  infoContainer: {
    rowGap: 8,
  },
  labelInfoText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.DarkGrayColor,
  },
  InfoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.DarkGrayColor,
  },
});
