import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';

import {branchService, filterBranchesByCategory} from '../services/branch';

import {Branch} from '../model/Branch';
import {Category} from '../model/Category';
import {categoryServices} from '../services/category';
import {promotionServices} from '../services/promotion';
import {Promotion} from '../model/Promotion';
import {LoaderScreen} from './LoaderScreen';
import {useAppSelector} from '../hooks/useRedux';

export const HomeBranchScreen = ({navigation}: any) => {
  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotios] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>('-1');
  const currentLocation = useAppSelector(
    state => state.currentLocation.currentLocation,
  );

  const getBranchs = async () => {
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
    setIsLoading(true);
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
        },
        ...(data as Category[]),
      ]);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getPromotions = async () => {
      const response = await promotionServices();
      if (response.ok) {
        setPromotios(response.data as Promotion[]);
      }
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
            <PromoList promotions={promotions} />
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
