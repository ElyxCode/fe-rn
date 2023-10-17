import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';
import {PromoList} from '../components/PromoList';
import {CategoryHomeList} from '../components/CategoryHomeList';
import {BranchHomeList} from '../components/BranchHomeList';
import {BranchService} from '../services/branch';
import {Branch} from '../model/Branch';

export const HomeBranchScreen = ({navigation}: any) => {
  const [branchs, setBranchs] = useState<Branch[]>([]);

  useEffect(() => {
    const getBranchs = async () => {
      const {data} = await BranchService();
      setBranchs(data as Branch[]);
    };

    getBranchs();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBarHome navigation={navigation} />
      <LocationBar />
      <ScrollView style={styles.scrollContainer}>
        <PromoList />
        <CategoryHomeList />
        <BranchHomeList branchs={branchs} />
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
