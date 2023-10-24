import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import {CustomNavBar} from '../components/CustomNavBar';
import {PromoList} from '../components/PromoList';
import {LoaderScreen} from './LoaderScreen';

import {branchByIdService} from '../services/branch';
import {promotionByBranchServices} from '../services/promotion';

import {Branch} from '../model/Branch';
import {Promotion} from '../model/Promotion';

import InfoCircleIcon from '../assets/info_circle.svg';
import RatingStarIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';
import ArrowDownIcon from '../assets/arrow_down.svg';

import {colors} from '../styles/colors';

type BranchDetailScreenProps = {
  branchId?: string;
};

export const BranchDetailScreen = ({route}: any) => {
  const [branchData, setBranchData] = useState<Branch>({} as Branch);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {branchId} = route.params;

  useEffect(() => {
    const getBranchData = async () => {
      setIsLoading(true);
      const response = await branchByIdService(branchId);
      if (response.ok) {
        setBranchData(prev => ({...prev, ...response.data}));
      } else {
        console.log({error: response.originalError});
      }
    };

    getBranchData();
  }, []);

  useEffect(() => {
    const getPromotionsData = async () => {
      const response = await promotionByBranchServices(
        branchData?.location?.lat ?? '',
        branchData?.location?.lng ?? '',
        'normal',
        branchId,
      );
      if (response.ok) {
        setPromotions(response.data as Promotion[]);
      } else {
        console.log({error: response.originalError});
      }
      setIsLoading(false);
    };
    getPromotionsData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBar />
          <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{uri: branchData.banner}} style={styles.image} />
              <Image source={{uri: branchData.logo}} style={styles.logo} />
            </View>
            <View style={styles.branchInfoContainer}>
              <View style={styles.TitleInfoContainer}>
                <Text style={styles.titleText}>{branchData.name}</Text>
                <Pressable>
                  <InfoCircleIcon height={30} />
                </Pressable>
              </View>
              <View style={styles.ratingDeliveryContainer}>
                <View style={styles.ratingDeliveryItem}>
                  <RatingStarIcon height={14} />
                  <Text style={styles.ratingDeliveryText}>
                    {branchData.rating}
                  </Text>
                </View>
                <View style={styles.ratingDeliveryItem}>
                  <TruckIcon height={14} />
                  <Text style={styles.ratingDeliveryText}>
                    {branchData.delivery_time}
                  </Text>
                </View>
              </View>
              <View style={styles.descriptionBranchContainer}>
                <Text style={styles.descriptionText}>
                  {branchData.description}
                </Text>
              </View>
            </View>
            {promotions.length !== 0 && <PromoList promotions={promotions} />}
            <View style={styles.productsCategoryContainer}>
              <Text style={styles.productsText}>Productos</Text>
              <Pressable>
                <View style={styles.categoryButtonContainer}>
                  <Text style={styles.categoryTextButton}>Categorias</Text>
                  <ArrowDownIcon height={16} />
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 22,
  },
  imageContainer: {
    height: 92,
    borderRadius: 10,
  },
  image: {
    height: 92,
    borderRadius: 10,
  },
  logo: {
    marginLeft: 14,
    bottom: 75,
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  branchInfoContainer: {
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  TitleInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-SemiBold',
    width: 275,
  },
  ratingDeliveryContainer: {
    paddingTop: 25,
    flexDirection: 'row',
    columnGap: 20,
  },
  ratingDeliveryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 8,
  },
  ratingDeliveryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.PrimaryTextColor,
  },
  descriptionBranchContainer: {
    paddingTop: 7,
    paddingBottom: 10,
  },
  descriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: colors.DarkGrayColor,
  },
  productsCategoryContainer: {
    paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productsText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: colors.PrimaryTextColor,
  },
  categoryButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.SecondaryColor,
    backgroundColor: colors.White,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    columnGap: 15,
  },
  categoryTextButton: {
    fontSize: 12,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
