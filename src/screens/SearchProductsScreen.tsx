import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {CustomNavBar} from '../components/CustomNavBar';
import {ProductItemRender} from '../components/ProductItemRender';
import {SearchInput} from '../components/SearchInput';

import {LoaderScreen} from './LoaderScreen';

import {
  nextPageProductsService,
  productsService,
  searchProductByProductName,
} from '../services/product/product';

import {Product} from '../model/product';

import {colors} from '../styles/colors';

export const SearchProductsScreen = ({route, navigation}: any) => {
  const {branchData} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [nextPageProduct, setNextPageProduct] = useState<
    string | null | undefined
  >('');

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    setIsLoading(true);
    const response = await productsService(branchData.id);
    if (response.ok) {
      setNextPageProduct(response.data?.links.next);
      setProducts(response.data?.data as Product[]);
    } else {
      console.log({error: response.originalError});
    }
    setIsLoading(false);
  };

  // carga mas productos
  const loadMoreProducts = async () => {
    setLoadMore(true);
    console.log('loadmore');
    const response = await nextPageProductsService(
      branchData.id,
      nextPageProduct ?? '',
      '',
    );

    if (response.ok) {
      setNextPageProduct(response.data?.links.next);

      setProducts([...products, ...(response.data?.data ?? [])]);
    } else {
      console.log({error: response.originalError});
    }

    setLoadMore(false);
  };

  const searchProducts = async () => {
    setIsLoading(true);
    const response = await searchProductByProductName(
      branchData.id,
      inputValue,
    );

    if (response.ok) {
      setProducts(response.data?.data ?? []);
    }
    setIsLoading(false);
  };

  const textChanged = async (text: string) => {
    setInputValue(text);
  };

  const clearText = () => {
    if (isLoading) return;
    console.log('borrando');
    setInputValue('');
    getProductData();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <View style={{paddingHorizontal: 10}}>
        <SearchInput
          textChanged={e => textChanged(e)}
          onPressCloseIcon={clearText}
          inputValue={inputValue}
          title="Buscar Producto"
          onSubmit={searchProducts}
          editable={!isLoading}
        />
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <LoaderScreen />
        ) : (
          <FlatList
            data={products}
            contentContainerStyle={{
              paddingBottom: 20,
            }}
            renderItem={({item}) => (
              <ProductItemRender product={item} navigation={navigation} />
            )}
            showsVerticalScrollIndicator={false}
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
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
