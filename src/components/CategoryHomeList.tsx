import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {colors} from '../styles/colors';

const catList = [
  {
    id: 1,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Todos',
  },
  {
    id: 2,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Cemento',
  },
  {
    id: 3,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Herramientas',
  },
  {
    id: 4,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Jardineria',
  },
  {
    id: 5,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Jardineria',
  },
  {
    id: 6,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Jardineria',
  },
  {
    id: 7,
    uri: 'https://img.icons8.com/nolan/64/react-native.png',
    category: 'Jardineria',
  },
];

const CategoryRender = ({
  imageUri,
  category,
}: {
  imageUri: string;
  category: string;
}) => {
  return (
    <View style={styles.categoryContainer}>
      <Image source={{uri: imageUri}} height={17} width={21} />
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );
};

export const CategoryHomeList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Todo en un solo lugar</Text>
      <FlatList
        horizontal={true}
        data={catList}
        renderItem={({item}) => (
          <CategoryRender imageUri={item.uri} category={item.category} />
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: 5}}></View>}
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
  categoryContainer: {
    backgroundColor: colors.PrimaryColor,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 12,
    columnGap: 8,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colors.White,
  },
});
