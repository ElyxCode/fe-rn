import React from 'react';
import {StyleSheet, View, Image, Text, Pressable} from 'react-native';

import ArrowDownIcon from '../assets/arrow_down.svg';
import ArrowUpIcon from '../assets/arrow_up.svg';

import {colors} from '../styles/colors';

import {useAppDispatch} from '../hooks/useRedux';
import {setCategory} from '../services/category/categorySlice';

type CategoryItemRenderProps = {
  item: any;
  updateActiveSection: any;
  navigation: any;
};

export const CategoryItem = ({
  item,
  updateActiveSection,
  navigation,
}: CategoryItemRenderProps) => {
  // const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  return (
    <View>
      <View style={styles.categoryItemContainer}>
        <Pressable
          style={{flex: 1}}
          onPress={() => {
            dispatch(
              setCategory({categoryId: item.id, categoryName: item.name}),
            );
            navigation.goBack();
          }}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 8,
              alignItems: 'center',
            }}>
            {item.avatar !== null ? (
              <Image source={{uri: item.avatar ?? ''}} height={17} width={17} />
            ) : null}

            <Text style={styles.categoryItemText}>{item.name}</Text>
          </View>
        </Pressable>
        {item.categories.length > 0 ? (
          <View style={{paddingLeft: 8}}>
            <Pressable
              onPress={() => {
                item.isExtended = !item.isExtended;
                updateActiveSection(item);
              }}>
              {item.isExtended ? (
                <ArrowUpIcon height={16} width={16} />
              ) : (
                <ArrowDownIcon height={16} width={16} />
              )}
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItemContainer: {
    backgroundColor: colors.PrimaryBackgroundColor,
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  categoryItemText: {
    paddingLeft: 3,
    fontSize: 12,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-SemiBold',
  },
});
