import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';

import {Category} from '../model/Category';

import AllCategory from '../assets/allcategory_cyan.svg';

import {colors} from '../styles/colors';

type CategoryHomeListProps = {
  categories: Category[];
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const CategoryHomeList = ({
  categories,
  categoryId,
  setCategoryId,
}: CategoryHomeListProps) => {
  const handleSelectionItem = async (id: string) => {
    setCategoryId(id);
  };

  const CategoryItemRender = ({
    id,
    imageUri,
    category,
  }: {
    id: string;
    imageUri?: string;
    category?: string;
  }) => {
    return (
      <Pressable onPress={() => handleSelectionItem(id)}>
        <View
          style={[
            styles.categoryContainer,
            id === categoryId ? styles.categoryContainerSelected : null,
          ]}>
          {imageUri === 'allCategory' ? (
            <AllCategory height={21} width={21} />
          ) : imageUri ? (
            <Image
              source={{uri: imageUri ?? undefined}}
              height={21}
              width={21}
              style={{tintColor: colors.SecondaryColor}}
            />
          ) : null}
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Todo en un solo lugar</Text>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20}}
        horizontal={true}
        data={categories}
        extraData={categoryId}
        renderItem={({item}) => (
          <CategoryItemRender
            id={item.id.toString()}
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
    paddingHorizontal: 20,
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
  categoryContainerSelected: {
    borderColor: colors.SecondaryColor,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colors.White,
  },
});
