import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '../hooks/useRedux';

import {CustomNavBar} from '../components/CustomNavBar';
import {PromoList} from '../components/PromoList';
import {LoaderScreen} from './LoaderScreen';

import {branchByIdService} from '../services/branch';
import {promotionByBranchServices} from '../services/promotion';
import {
  productsService,
  nextPageProductsService,
  getProductByCategoryService,
} from '../services/product/product';

import {clearCategorySelected} from '../services/category/categorySlice';

import {Branch} from '../model/Branch';
import {Promotion} from '../model/Promotion';
import {Product} from '../model/product';

import InfoCircleIcon from '../assets/info_circle.svg';
import RatingStarIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';
import ArrowDownIcon from '../assets/arrow_down.svg';
import CloseCircleIcon from '../assets/close_circle_cyan.svg';

import {colors} from '../styles/colors';
import {ProductItemRender} from '../components/ProductItemRender';
import {Item} from '../components/NestedListExtended/NestedListItem';
import {CartButton} from '../components/CartButton';

export const BranchDetailScreen = ({route, navigation}: any) => {
  const [branchData, setBranchData] = useState<Branch>({} as Branch);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingPromo, setIsLoadingPromo] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [nextPageProduct, setNextPageProduct] = useState<
    string | null | undefined
  >('');
  const category = useAppSelector(state => state.categorySelected);
  const productsCart = useAppSelector(state => state.productsCart);
  const totalValue = useAppSelector(state => state.productsCart.totalValue);
  const token = useAppSelector(state => state.authToken.token);
  const dispatch = useAppDispatch();
  // hook que devueleve bool si estas o no en esta pantalla
  const isFocused = useIsFocused();

  const {branchId} = route.params;

  // es llamado cuando se selecciona una categoria
  useEffect(() => {
    const getProductByCategory = async () => {
      if (category.categoryId !== '' && category.categoryName !== '') {
        setIsLoading(true);
        console.log({
          branchId,
          nextPageProduct,
          categoryId: category.categoryId,
        });
        const response = await getProductByCategoryService(
          branchId,
          category.categoryId,
        );

        if (response.ok) {
          setProducts(response.data?.data as Product[]);
        } else {
          console.log({error: response.originalError});
        }
        setIsLoading(false);
      }
    };
    console.log({productsCart: productsCart.products});
    console.log({totalValue});
    getProductByCategory();
  }, [category]);

  // Carga servicio de info de branch
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

  //carga servicio de promociones
  useEffect(() => {
    const getPromotionsData = async () => {
      setIsLoadingPromo(true);
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
      setIsLoadingPromo(false);
    };
    getPromotionsData();
  }, []);

  // servicio qu obtiene los productos
  useEffect(() => {
    const getProductData = async () => {
      if (category.categoryId === '' && category.categoryName === '') {
        setIsLoading(true);
        const response = await productsService(branchId);
        if (response.ok) {
          setNextPageProduct(response.data?.links.next);
          setProducts(response.data?.data as Product[]);
        } else {
          console.log({error: response.originalError});
        }
        setIsLoading(false);
      }
    };

    getProductData();
  }, [category]);

  // carga mas productos
  const loadMoreProducts = async () => {
    setLoadMore(true);
    console.log('loadmore');
    const response = await nextPageProductsService(
      branchId,
      nextPageProduct ?? '',
      category.categoryId,
    );

    if (response.ok) {
      setNextPageProduct(response.data?.links.next);
      setProducts([...products, ...(response.data?.data ?? [])]);
    } else {
      console.log({error: response.originalError});
    }

    setLoadMore(false);
  };

  // limpia el estado global de categoria
  useEffect(() => {
    if (
      !isFocused &&
      category.categoryId !== '' &&
      category.categoryName !== ''
    ) {
      dispatch(clearCategorySelected());
    }
  }, [isFocused]);

  const HeaderBranchDetail = () => {
    return (
      <>
        <View style={styles.imageContainer}>
          {branchData.banner !== undefined && branchData.logo !== undefined ? (
            <>
              <Image source={{uri: branchData.banner}} style={styles.image} />
              <Image source={{uri: branchData.logo}} style={styles.logo} />
            </>
          ) : null}
        </View>
        <View style={styles.branchInfoContainer}>
          <View style={styles.TitleInfoContainer}>
            <Text style={styles.titleText}>{branchData.name}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('BranchInfoModal', {
                  ...branchData,
                } as Branch)
              }>
              <InfoCircleIcon height={30} />
            </Pressable>
          </View>
          <View style={styles.ratingDeliveryContainer}>
            <View style={styles.ratingDeliveryItem}>
              <RatingStarIcon height={14} />
              <Text style={styles.ratingDeliveryText}>{branchData.rating}</Text>
            </View>
            <View style={styles.ratingDeliveryItem}>
              <TruckIcon height={14} />
              <Text style={styles.ratingDeliveryText}>
                {branchData.delivery_time}
              </Text>
            </View>
          </View>
          <View style={styles.descriptionBranchContainer}>
            <Text style={styles.descriptionText}>{branchData.description}</Text>
          </View>
        </View>
        <PromoList
          promotions={promotions}
          navigation={navigation}
          isLoading={isLoadingPromo}
        />
        <View style={styles.productsCategoryContainer}>
          <Text style={styles.productsText}>Productos</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('CategoryListModal', {branchId})
            }>
            <View style={styles.categoryButtonContainer}>
              <Text
                style={styles.categoryTextButton}
                lineBreakMode="tail"
                numberOfLines={1}>
                {category.categoryName !== ''
                  ? category.categoryName
                  : 'Categorias'}
              </Text>
              <ArrowDownIcon height={16} />
            </View>
          </Pressable>
        </View>
        {category.categoryName !== '' ? (
          <View style={styles.categorySelectedContainer}>
            <Text
              style={styles.categorySelectedText}
              lineBreakMode="tail"
              numberOfLines={1}>
              {category.categoryName}
            </Text>
            <Pressable
              onPress={() => {
                dispatch(clearCategorySelected());
              }}>
              <CloseCircleIcon height={21} width={21} />
            </Pressable>
          </View>
        ) : null}
      </>
    );
  };

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <CustomNavBar />
      <View style={styles.productListContainer}>
        <FlatList
          ListHeaderComponent={<HeaderBranchDetail />}
          data={products}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({item}) => (
            <ProductItemRender product={item} navigation={navigation} />
          )}
          scrollEnabled={!loadMore}
          ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
          keyExtractor={item => item.id.toString() + Math.random() * 3}
          initialNumToRender={20}
          onEndReachedThreshold={0.001}
          onEndReached={() => {
            if (
              nextPageProduct !== null &&
              nextPageProduct !== '' &&
              nextPageProduct !== undefined
            ) {
              loadMoreProducts();
            } else {
              console.log('No hay mas items');
            }
          }}
          ListFooterComponent={
            loadMore ? (
              <>
                <View
                  style={{
                    height: 25,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={25} color={colors.PrimaryColor} />
                </View>
              </>
            ) : null
          }
        />
      </View>
      {token && productsCart.products.length !== 0 && (
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
  imageContainer: {
    height: 92,
    borderRadius: 10,
    paddingHorizontal: 20,
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
    paddingHorizontal: 35,
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
    paddingBottom: 30,
    paddingHorizontal: 20,
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
  productListContainer: {
    flex: 1,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: colors.White,
    borderRadius: 10,
    marginHorizontal: 20,
    padding: 5,
  },
  imageProductContainer: {
    height: 80,
  },
  productInfoContainer: {
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingVertical: 5,
    width: 250,
  },
  categorySelectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.White,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  categorySelectedText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.PrimaryTextColor,
  },
});
