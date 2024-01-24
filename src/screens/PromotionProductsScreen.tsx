import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {ProductItemRender} from '../components/ProductItemRender';
import {PromotionImageDetail} from '../components/PromotionImageDetail';

import {LoaderScreen} from './LoaderScreen';

import {Promotion} from '../model/Promotion';

import {colors} from '../styles/colors';

type PromoProps = {
  promotion: Promotion;
  navigation: any;
};

export const PromotionProductsScreen = ({route, navigation}: any) => {
  const {promotion}: {promotion: Promotion} = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [nextPageProduct, setNextPageProduct] = useState<
    string | null | undefined
  >('');

  useEffect(() => {
    // Simulate a delay (replace this with your actual initialization)
    const initializeScreen = async () => {
      try {
        // Simulate a delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // After your initialization is done, set isLoading to false to hide the loader
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Make sure to hide the loader even in case of an error
      }
    };

    initializeScreen();
  }, []); // The empty dependency array ensures this effect runs only once after component mount

  if (isLoading) return <LoaderScreen />;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <PromotionImageDetail
          image={promotion.image}
          height={165}></PromotionImageDetail>
        <Text style={styles.title}>Productos</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={promotion.products}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          renderItem={({item}) => (
            <ProductItemRender product={item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={{height: 15}}></View>}
          keyExtractor={item => item.id.toString() + Math.random() * 3}
          initialNumToRender={20}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 20,
    fontSize: 14,
    marginTop: 35,
    marginBottom: 16,
    color: colors.PrimaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
