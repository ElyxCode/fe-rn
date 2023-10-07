import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {LocationBar} from '../components/LocationBar';

export const HomeBranchScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBarHome />
      <LocationBar />
      <ScrollView style={styles.scrollContainer}></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: 'red',
  },
});
