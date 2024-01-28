import React, {useState} from 'react';
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

import {
  nextPageProductsService,
  searchProductByProductName,
} from '../services/product/product';

import {ProductResponse} from '../model/product';

import {colors} from '../styles/colors';

export const SearchProductsScreen = ({route, navigation}: any) => {
  const {branchData, productResponse} = route.params;

  const [inputValue, setInputValue] = useState('');
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [nextPageProduct, setNextPageProduct] = useState<
    string | null | undefined
  >('');
  const [searchProductResponse, setSearchProductResponse] =
    useState<ProductResponse>(productResponse);

  const textChanged = async (text: string) => {
    setInputValue(text);
  };

  const clearText = () => {
    console.log('borrando');
    setInputValue('');
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
      setSearchProductResponse(response.data as ProductResponse);
    } else {
      console.log({error: response.originalError});
    }

    setLoadMore(false);
  };

  const searchProducts = async () => {
    setLoadMore(true);
    const response = await searchProductByProductName(
      branchData.id,
      inputValue,
    );

    if (response.ok) {
      setSearchProductResponse(response?.data as ProductResponse);
    }
    setLoadMore(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <SearchInput
              textChanged={e => textChanged(e)}
              onPressCloseIcon={clearText}
              inputValue={inputValue}
              title="Buscar Producto"
              onSubmit={searchProducts}
            />
          }
          data={searchProductResponse?.data}
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
