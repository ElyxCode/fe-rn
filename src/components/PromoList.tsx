import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';

import {Promotion} from '../model/Promotion';

import {colors} from '../styles/colors';



type PromoListProps = {
  promotions: Promotion[];
  navigation: any;
};



export const PromoList = ({promotions, navigation }: PromoListProps) => {
  
  const PromoItemRender = ({item}: {item: Promotion}) => {
    return (
      <TouchableOpacity onPress={ () =>{
        if(item.products.length > 0){
          navigation.navigate('PromotionProductsScreen',{promotion:item})
        }else{
          navigation.navigate('PromotionDetailScreen',{promotion:item})
        }
        
      }}> 
        <Image
          source={{uri: item.image}}
          height={128}
          width={233}
          style={{borderRadius: 12}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Promos</Text>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        horizontal={true}
        data={promotions}
        renderItem={({item}) => <PromoItemRender  item={item} />}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 12}}></View>}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
