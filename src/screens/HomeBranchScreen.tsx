import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {useAppSelector} from '../hooks/useRedux';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';
import {LoaderScreen} from './LoaderScreen';

import {branchService, filterBranchesByCategory} from '../services/branch';
import {categoryServices} from '../services/category/category';
import {promotionServices} from '../services/promotion';

import {Branch} from '../model/Branch';
import {Category} from '../model/Category';
import {Promotion} from '../model/Promotion';

export const HomeBranchScreen = ({navigation}: any) => {
  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotios] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPromo, setIsLoadingPromo] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('-1');
  const currentLocation = useAppSelector(
    state => state.currentLocation.currentLocation,
  );

  const getBranchs = async () => {
    setIsLoading(true);
    try {
      console.log(categoryId);
      console.log(currentLocation.title);
      if (categoryId === '-1') {
        const {data} = await branchService();
        setBranchs(data as Branch[]);
      } else {
        const response = await filterBranchesByCategory(
          {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          },
          categoryId,
        );
        setBranchs(response.data!);
      }
    } catch (error) {
      // Manejar errores aquí
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBranchs();
  }, [categoryId, currentLocation]);

  useEffect(() => {
    const getCategories = async () => {
      const {data} = await categoryServices();
      setCategories([
        {
          id: -1,
          avatar: 'allCategory',
          name: 'Todas las categorias',
          description: '',
          count: null,
          categories: [],
          isExpanded: false,
        },
        ...(data as Category[]),
      ]);
    };

    getCategories();
  }, []);

  useEffect(() => {
    setIsLoadingPromo(true);
    const getPromotions = async () => {
      const response = await promotionServices();
      if (response.ok) {
        setPromotios(response.data as Promotion[]);
      }
      setIsLoadingPromo(false);
    };

    getPromotions();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBarHome navigation={navigation} />
          <LocationBar name={currentLocation.title!} />
          <ScrollView style={styles.scrollContainer}>
            <PromoList
              promotions={promotions}
              navigation={navigation}
              isLoading={isLoadingPromo}
            />
            <CategoryHomeList
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
            <BranchHomeList branchs={branchs} navigation={navigation} />
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {},
});
