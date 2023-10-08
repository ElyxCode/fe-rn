import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';

export const HomeBranchScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBarHome />
      <LocationBar />
      <ScrollView style={styles.scrollContainer}>
        <PromoList />
        <CategoryHomeList />
        <BranchHomeList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
});
