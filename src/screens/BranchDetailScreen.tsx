import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';

import {CustomNavBar} from '../components/CustomNavBar';
import {PromoList} from '../components/PromoList';
import {LoaderScreen} from './LoaderScreen';

import {branchByIdService} from '../services/branch';
import {promotionByBranchServices} from '../services/promotion';
import {productsService, nextPageProductsService} from '../services/product';

import {Branch} from '../model/Branch';
import {Promotion} from '../model/Promotion';
import {Product} from '../model/product';

import InfoCircleIcon from '../assets/info_circle.svg';
import RatingStarIcon from '../assets/Rating_Star.svg';
import TruckIcon from '../assets/truck.svg';
import ArrowDownIcon from '../assets/arrow_down.svg';

import {colors} from '../styles/colors';

type ProductProps = {
  id: string;
  image?: string;
  productName?: string;
  normalPrice?: string | null;
  specialPrice?: string | null;
  brandProduct?: string | null;
};

export const BranchDetailScreen = ({route}: any) => {
  const [branchData, setBranchData] = useState<Branch>({} as Branch);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [nextPageProduct, setNextPageProduct] = useState<
    string | null | undefined
  >('');
  const {branchId} = route.params;

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
    };
    getPromotionsData();
  }, []);

  // servicio qu obtiene los productos
  useEffect(() => {
    const getProductData = async () => {
      const response = await productsService(branchId);
      if (response.ok) {
        // console.log({GetProductHasNextPageProduct: response.data?.links.next});
        setNextPageProduct(response.data?.links.next);
        setProducts(response.data?.data as Product[]);
      } else {
        console.log({error: response.originalError});
      }
      setIsLoading(false);
    };

    getProductData();
  }, []);

  // carga mas productos
  const loadMoreProducts = async () => {
    setLoadMore(true);
    console.log('loadmore');
    const response = await nextPageProductsService(
      branchId,
      nextPageProduct ?? '',
      categoryId,
    );

    if (response.ok) {
      console.log({hasNextPageMOre: response.data?.links.next});
      setNextPageProduct(response.data?.links.next);
      setProducts([...products, ...(response.data?.data ?? [])]);
    } else {
      console.log({error: response.originalError});
    }

    setLoadMore(false);
  };

  const ProductItemRender = ({
    id,
    image,
    productName,
    normalPrice,
    specialPrice,
    brandProduct,
  }: ProductProps) => {
    return (
      <View style={styles.productContainer}>
        <View style={styles.imageProductContainer}>
          <Image source={{uri: image}} style={{height: 80, width: 80}} />
        </View>
        <View style={styles.productInfoContainer}>
          <Text
            style={styles.productNameText}
            numberOfLines={1}
            lineBreakMode="tail">
            {productName}
          </Text>
          <View style={styles.priceProductContainer}>
            <Text
              style={[
                styles.priceText,
                {
                  textDecorationLine: specialPrice ? 'line-through' : 'none',
                  color: specialPrice
                    ? colors.DarkGrayColor
                    : colors.PrimaryTextColor,
                },
              ]}>
              ${normalPrice}
            </Text>
            {specialPrice ? (
              <Text
                style={[
                  styles.priceText,
                  {
                    textDecorationLine: specialPrice ? 'none' : 'line-through',
                    color: specialPrice
                      ? colors.PrimaryTextColor
                      : colors.DarkGrayColor,
                  },
                ]}>
                ${specialPrice}
              </Text>
            ) : null}
          </View>
          <Text style={styles.brandText}>{brandProduct}</Text>
        </View>
      </View>
    );
  };

  const HeaderBranchDetail = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <CustomNavBar />
          <View style={styles.productListContainer}>
            <FlatList
              ListHeaderComponent={<HeaderBranchDetail />}
              data={products}
              contentContainerStyle={{
                paddingBottom: 20,
              }}
              renderItem={({item}) => (
                <ProductItemRender
                  id={item.id.toString()}
                  image={item.image}
                  productName={item.name}
                  normalPrice={item.price}
                  specialPrice={item.price_with_discount}
                  brandProduct={item.brand.name}
                />
              )}
              scrollEnabled={!loadMore}
              ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
              keyExtractor={item => item.id.toString() + Math.random() * 3}
              initialNumToRender={20}
              onEndReachedThreshold={
                Platform.OS === 'ios'
                  ? 0.001
                  : Dimensions.get('window').height / 2
              }
              onEndReached={() => {
                // console.log('-----------');
                // console.log('onReacch');
                // console.log({linkProductOnENd: nextPageProduct});
                // setNextPageProduct(nextPageProduct?.split('=')[1]);
                // console.log({linkProducConvertonENd: nextPageProduct});
                // console.log('-----------');

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
                      <ActivityIndicator
                        size={25}
                        color={colors.PrimaryColor}
                      />
                    </View>
                  </>
                ) : null
              }
            />
          </View>
        </>
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
    paddingBottom: 40,
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
  productNameText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  priceProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  priceText: {
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Medium',
  },
  brandText: {
    fontSize: 12,
    color: colors.PrimaryTextColor,
    fontFamily: 'Poppins-Medium',
  },
});
