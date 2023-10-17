import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../styles/colors';

export const LoaderScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={colors.PrimaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
