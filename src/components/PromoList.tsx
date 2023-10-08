import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/colors';
import {FlatList} from 'react-native-gesture-handler';

const images = [
  {id: 1, uri: 'https://reactjs.org/logo-og.png'},
  {id: 2, uri: 'https://reactjs.org/logo-og.png'},
  {id: 3, uri: 'https://reactjs.org/logo-og.png'},
  {id: 4, uri: 'https://reactjs.org/logo-og.png'},
];

const PromoImagesRender = ({uri}: {uri: string}) => {
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

export const PromoList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Promos</Text>
      <FlatList
        horizontal={true}
        data={images}
        renderItem={({item}) => <PromoImagesRender uri={item.uri} />}
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
