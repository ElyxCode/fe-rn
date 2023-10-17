import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';

import {Category} from '../model/Category';

import AllCategory from '../assets/allcategory_cyan.svg';

import {colors} from '../styles/colors';

type CategoryHomeListProps = {
  categories: Category[];
};

const CategoryItemRender = ({
  imageUri,
  category,
}: {
  imageUri?: string;
  category?: string;
}) => {
  return (
    <View style={styles.categoryContainer}>
      {imageUri === 'allCategory' ? (
        <AllCategory height={17} width={21} />
      ) : (
        <Image source={{uri: imageUri}} height={17} width={21} />
      )}
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );
};

export const CategoryHomeList = ({categories}: CategoryHomeListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Todo en un solo lugar</Text>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={({item}) => (
          <CategoryItemRender
            imageUri={item.avatar?.toString()}
            category={item.name}
          />
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
