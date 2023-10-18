import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';

import {Promotion} from '../model/Promotion';

import {colors} from '../styles/colors';

// const images = [
//   {id: 1, uri: 'https://reactjs.org/logo-og.png'},
//   {id: 2, uri: 'https://reactjs.org/logo-og.png'},
//   {id: 3, uri: 'https://reactjs.org/logo-og.png'},
//   {id: 4, uri: 'https://reactjs.org/logo-og.png'},
// ];

type PromoListProps = {
  promotions: Promotion[];
};

const PromoItemRender = ({uri}: {uri: string}) => {
  return (
    <View>
      <Image
        source={{uri: uri}}
        height={128}
        width={233}
        style={{borderRadius: 12}}
      />
    </View>
  );
};

export const PromoList = ({promotions}: PromoListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Promos</Text>
      <FlatList
        horizontal={true}
        data={promotions}
        renderItem={({item}) => <PromoItemRender uri={item.image} />}
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
  },
});
