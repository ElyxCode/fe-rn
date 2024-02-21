import {createStackNavigator} from '@react-navigation/stack';

import {AddressNavigation} from './AddressNavigation';
import {BranchNavigation} from './BranchNavigation';

import {CustomNavBar} from '../components/CustomNavBar';

import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {SearchAddressScreen} from '../screens/SearchAddressScreen';
import {PromotionDetailScreen} from '../screens/PromotionDetailScreen';
import {PromotionProductsScreen} from '../screens/PromotionProductsScreen';
import {SearchBranchsScreen} from '../screens/SearchBranchsScreen';

export type HomeStackParams = {
  BranchNavigation: undefined;
  HomeBranchScreen: undefined;
  MapConfirmationScreen: undefined;
  AddressNavigation: undefined;
  SearchAddressScreen: undefined;
  PromotionDetailScreen: any;
  PromotionProductsScreen: any;
  SearchBranchsScreen: any;
};

const HomeStack = createStackNavigator<HomeStackParams>();

export const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="HomeBranchScreen">
      <HomeStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
      <HomeStack.Screen
        name="AddressNavigation"
        component={AddressNavigation}
      />
      <HomeStack.Screen
        name="MapConfirmationScreen"
        component={MapConfirmationScreen}
      />
      <HomeStack.Screen
        name="SearchAddressScreen"
        component={SearchAddressScreen}
      />
      <HomeStack.Screen
        name="PromotionDetailScreen"
        component={PromotionDetailScreen}
      />
      <HomeStack.Screen
        name="PromotionProductsScreen"
        component={PromotionProductsScreen}
      />
      <HomeStack.Screen
        name="SearchBranchsScreen"
        component={SearchBranchsScreen}
      />

      <HomeStack.Screen name="BranchNavigation" component={BranchNavigation} />
    </HomeStack.Navigator>
  );
};
