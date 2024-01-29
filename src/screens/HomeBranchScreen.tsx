import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';
import {CartButton} from '../components/CartButton';

import {LoaderScreen} from './LoaderScreen';

import {branchService, filterBranchesByCategory} from '../services/branch';
import {categoryServices} from '../services/category/category';
import {promotionServices} from '../services/promotion';
import {getCardsService} from '../services/card/card';
import {ReadAll} from '../services/address/Address';
import {setAddress} from '../services/address/addressSlice';
import {setCard} from '../services/card/cardSlice';

import {Branch} from '../model/Branch';
import {Category} from '../model/Category';
import {Promotion} from '../model/Promotion';
import {Address} from '../model/Address';
import {Card} from '../model/Card';

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
  const productsCart = useAppSelector(state => state.productsCart);
  const currentAddress = useAppSelector(state => state.currentAddress);
  const currentCard = useAppSelector(state => state.currentCard);
  const authToken = useAppSelector(state => state.authToken);
  const isLoggedIn = useAppSelector(state => state.authToken.isLoggedIn);
  const dispatch = useAppDispatch();

  const isFocused = useIsFocused();

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
            lat:
              Object.keys(currentAddress.address).length !== 0
                ? currentAddress.address.location.lat
                : currentLocation.lat,
            lng:
              Object.keys(currentAddress.address).length !== 0
                ? currentAddress.address.location.lng
                : currentLocation.lng,
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

  const getAddress = async () => {
    const resp = await ReadAll(authToken.token);
    dispatch(
      setAddress(resp.data?.find(address => address.active) ?? ({} as Address)),
    );
  };

  const getCards = async () => {
    const resp = await getCardsService(authToken.token);
    dispatch(setCard((resp.data?.find(i => i.active) as Card) ?? ({} as Card)));
  };

  useEffect(() => {
    if (
      authToken.isLoggedIn &&
      Object.keys(currentAddress.address).length === 0 &&
      isFocused
    ) {
      getAddress();
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      authToken.isLoggedIn &&
      Object.keys(currentCard.card).length === 0 &&
      isFocused
    ) {
      getCards();
    }
  }, [isFocused]);

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

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBarHome navigation={navigation} branchs={branchs} />
      <LocationBar
        name={
          Object.keys(currentAddress.address).length !== 0
            ? currentAddress.address.address
            : currentLocation.title!
        }
      />
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
      {isLoggedIn && productsCart.products.length !== 0 && (
        <CartButton
          itemAmount={productsCart.products.reduce(
            (acc, cv) => acc + cv.quantity,
            0,
          )}
          totalAmount={productsCart.totalValue}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginBottom: 5,
  },
});
