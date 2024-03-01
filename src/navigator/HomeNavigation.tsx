import {createStackNavigator} from '@react-navigation/stack';

import {AddressNavigation} from './AddressNavigation';
import {BranchNavigation} from './BranchNavigation';
import {ProfileNavigation} from './ProfileNavigation';
import {UnloggedNavigation} from './UnloggedNavigation';

import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {SearchAddressScreen} from '../screens/SearchAddressScreen';
import {PromotionDetailScreen} from '../screens/PromotionDetailScreen';
import {PromotionProductsScreen} from '../screens/PromotionProductsScreen';
import {SearchBranchsScreen} from '../screens/SearchBranchsScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {ConfirmOrderNavigation} from './ConfirmOrderNavigation';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';

export type HomeStackParams = {
  BranchNavigation: undefined;
  ProfileNavigation: undefined;
  UnloggedNavigation: undefined;
  HomeBranchScreen: undefined;
  MapConfirmationScreen: undefined;
  AddressNavigation: undefined;
  SearchAddressScreen: undefined;
  PromotionDetailScreen: undefined;
  PromotionProductsScreen: undefined;
  ProductDetailScreen: undefined;
  SearchBranchsScreen: undefined;
  ShoppingCartScreen: undefined;
  ConfirmOrderNavigation: undefined;
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
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <HomeStack.Screen
        name="SearchBranchsScreen"
        component={SearchBranchsScreen}
      />
      <HomeStack.Screen
        name="ShoppingCartScreen"
        component={ShoppingCartScreen}
      />
      <HomeStack.Screen name="BranchNavigation" component={BranchNavigation} />
      <HomeStack.Screen
        name="ConfirmOrderNavigation"
        component={ConfirmOrderNavigation}
      />
      <HomeStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
      <HomeStack.Screen
        name="UnloggedNavigation"
        component={UnloggedNavigation}
      />
    </HomeStack.Navigator>
  );
};
