import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import RatingStarIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';

import {Branch} from '../model/Branch';

import {colors} from '../styles/colors';

type BranchHomeListProps = {
  branchs: Branch[];
  navigation: any;
};

type BranchItemProps = {
  id: string;
  img?: string;
  icon?: string;
  name?: string;
  rate?: string;
  deliveryTime?: string;
};

export const BranchHomeList = ({branchs, navigation}: BranchHomeListProps) => {
  const BranchItemRender = ({
    id,
    img,
    icon,
    name,
    rate,
    deliveryTime,
  }: BranchItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('BranchDetailScreen', {branchId: id});
          navigation.navigate('BranchNavigation', {
            screen: 'BranchDetailScreen',
            params: {branchId: id},
          });
        }}>
        <View style={styles.BranchItemContainer}>
          <View style={styles.branchItemImageContainer}>
            <Image source={{uri: img}} height={61} style={styles.imageStyle} />
          </View>
          <View style={styles.branchDescriptionItemContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{uri: icon}}
                height={48}
                width={48}
                style={{
                  borderRadius: 25,
                  borderColor: colors.LightGrayColor,
                  borderWidth: 0.5,
                }}
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
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={branchs}
        renderItem={({item}) => (
          <BranchItemRender
            id={item.id.toString()}
            img={item.banner}
            icon={item.logo}
            name={item.name}
            rate={item.rating}
            deliveryTime={item.delivery_time?.toString()}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    paddingHorizontal: 20,
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
    columnGap: 20,
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
