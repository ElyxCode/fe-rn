import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PromotionImageDetail} from '../components/PromotionImageDetail';
import {Promotion} from '../model/Promotion';
import {colors} from '../styles/colors';
import {CustomNavBar} from '../components/CustomNavBar';

type PromoProps = {
  promotion: Promotion;
  navigation: any;
};

export const PromotionDetailScreen = ({route, navigation}: any) => {
  const {promotion}: {promotion: Promotion} = route.params;
  console.log(promotion, 'promocion');
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomNavBar />
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <PromotionImageDetail image={promotion.image} height={165} />
          <Text style={styles.title}>{promotion.title}</Text>
          <Text style={styles.description}>{promotion.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    paddingHorizontal: 21,
    fontSize: 20,
    marginTop: 35,
    marginBottom: 16,
    color: colors.PrimaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    paddingHorizontal: 21,
    fontSize: 16,
    color: colors.DarkGrayColor,
    fontFamily: 'Poppins-Regular',
  },
});
