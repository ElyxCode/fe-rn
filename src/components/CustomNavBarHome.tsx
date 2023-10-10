import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import HomeTitleIcon from '../assets/logo_title_home.svg';
import SearchHomeIcon from '../assets/search_home.svg';
import MenuHomeIcon from '../assets/menu_home_button.svg';

const heightIcon = 25;

export const CustomNavBarHome = () => {
  return (
    <View style={styles.container}>
      <HomeTitleIcon />
      <View style={styles.searchMenuContainer}>
        <Pressable>
          <SearchHomeIcon height={heightIcon} />
        </Pressable>
        <Pressable>
          <MenuHomeIcon height={heightIcon} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 30,
  },
});
