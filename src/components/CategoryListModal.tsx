import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {LoaderScreen} from '../screens/LoaderScreen';
import {NestedListExt} from './NestedListExtended/NestedListExt';

import {categoryByBranchServices} from '../services/category/category';

import {Category} from '../model/Category';

import CloseCircleIcon from '../assets/close_circle_cyan.svg';

import {colors} from '../styles/colors';

export const CategoryListModal = ({route, navigation}: any) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {branchId} = route.params;

  useEffect(() => {
    getCategoryByBranch(branchId);
  }, []);

  const getCategoryByBranch = async (branchId: string) => {
    setIsLoading(true);
    const response = await categoryByBranchServices(branchId);
    if (response.ok) {
      setCategories(response.data as Category[]);
      setCategories(prev =>
        prev.map(cat => ({
          ...cat,
          isExpanded: false,
        })),
      );
    }
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.White}}>
      {isLoading ? (
        <LoaderScreen />
      ) : (
        <>
          <View style={styles.container}>
            <View style={styles.closeButtonContainer}>
              <Pressable onPress={() => navigation.goBack()}>
                <CloseCircleIcon height={25} width={25} />
              </Pressable>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Busca por categoría</Text>
            </View>
            <NestedListExt
              listItems={categories}
              defaultView={'collapsed'}
              listWrapperStyle={{margin: 0}}
              childrenPath={'categories'}
              opacity={0.3}
              itemKey={(item: any) => item.id}
              onItemPressed={() => {}}
              onLastItemPressed={() => {}}
              navigation={navigation}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    paddingTop: 25,
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    paddingLeft: 20,
  },
  titleContainer: {
    paddingTop: 20,
    paddingBottom: 35,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: colors.PrimaryTextColor,
  },
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
