import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import RatingStarIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';
import {colors} from '../styles/colors';

const data = [
  {
    id: '1',
    img: 'https://reactjs.org/logo-og.png',
    icon: 'https://reactjs.org/logo-og.png',
    name: 'La ferreteria ideal',
    rate: '5',
    deliveryTime: 'Entre 1-2 horas',
  },
  {
    id: '2',
    img: 'https://reactjs.org/logo-og.png',
    icon: 'https://reactjs.org/logo-og.png',
    name: 'La ferreteria ideal',
    rate: '5',
    deliveryTime: 'Entre 1-2 horas',
  },
  {
    id: '3',
    img: 'https://reactjs.org/logo-og.png',
    icon: 'https://reactjs.org/logo-og.png',
    name: 'La ferreteria ideal',
    rate: '5',
    deliveryTime: 'Entre 1-2 horas',
  },
  {
    id: '4',
    img: 'https://reactjs.org/logo-og.png',
    icon: 'https://reactjs.org/logo-og.png',
    name: 'La ferreteria ideal',
    rate: '5',
    deliveryTime: 'Entre 1-2 horas',
  },
  {
    id: '5',
    img: 'https://reactjs.org/logo-og.png',
    icon: 'https://reactjs.org/logo-og.png',
    name: 'La ferreteria ideal',
    rate: '5',
    deliveryTime: 'Entre 1-2 horas',
  },
];

type BranchItemProps = {
  id: string;
  img: string;
  icon: string;
  name: string;
  rate: string;
  deliveryTime: string;
};

const BranchItemRender = ({
  id,
  img,
  icon,
  name,
  rate,
  deliveryTime,
}: BranchItemProps) => {
  return (
    <View style={styles.BranchItemContainer}>
      <View style={styles.branchItemImageContainer}>
        <Image source={{uri: icon}} height={61} style={styles.imageStyle} />
      </View>
      <View style={styles.branchDescriptionItemContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={{uri: icon}}
            height={48}
            width={48}
            style={{borderRadius: 25}}
          />
        </View>

        <View style={styles.branchItemDescription}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameBranchText}>{name}</Text>
          </View>
          <View style={styles.branchDescriptionDeliveryRateItemContainer}>
            <View style={styles.branchDescriptionDeliveryRateItem}>
              <RatingStarIcon height={14} />
              <Text style={styles.ratingText}>{rate}</Text>
            </View>
            <View style={styles.branchDescriptionDeliveryRateItem}>
              <TruckIcon height={16} />
              <Text style={styles.deliveryTimeText}>{deliveryTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export const BranchHomeList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <BranchItemRender
            id={item.id}
            img={item.img}
            icon={item.icon}
            name={item.name}
            rate={item.rate}
            deliveryTime={item.deliveryTime}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        keyExtractor={item => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  BranchItemContainer: {
    backgroundColor: colors.White,
    borderRadius: 10,
  },
  branchItemImageContainer: {
    width: '100%',
    borderRadius: 10,
  },
  imageStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  branchDescriptionItemContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 10,
  },
  branchItemDescription: {
    width: '100%',
    justifyContent: 'space-around',
  },
  nameContainer: {},
  branchDescriptionDeliveryRateItemContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  branchDescriptionDeliveryRateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  nameBranchText: {
    fontSize: 14,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-SemiBold',
  },
  ratingText: {
    fontSize: 12,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
  },
  deliveryTimeText: {
    fontSize: 12,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
