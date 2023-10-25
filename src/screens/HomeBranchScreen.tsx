import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';

import {branchService} from '../services/branch';

import {Branch} from '../model/Branch';
import {Category} from '../model/Category';
import {categoryServices} from '../services/category';
import {promotionServices} from '../services/promotion';
import {Promotion} from '../model/Promotion';
import {LoaderScreen} from './LoaderScreen';

export const HomeBranchScreen = ({navigation}: any) => {
  const [branchs, setBranchs] = useState<Branch[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [promotions, setPromotios] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getBranchs = async () => {
      setIsLoading(true);
      const {data} = await branchService();
      setBranchs(data as Branch[]);
    };

    getBranchs();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const {data} = await categoryServices();
      setCategories([
        {
          id: 9999,
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
      console.log(response)
      if(response.ok){
        setPromotios(response.data as Promotion[]);
        
      }
      setIsLoading(false);
     
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
          <LocationBar />
          <ScrollView style={styles.scrollContainer}>
            <PromoList promotions={promotions} />
            <CategoryHomeList categories={categories} />
            <BranchHomeList branchs={branchs} />
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
  scrollContainer: {
    paddingHorizontal: 20,
  },
});
