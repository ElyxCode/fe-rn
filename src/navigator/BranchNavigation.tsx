import {createStackNavigator} from '@react-navigation/stack';

import {ConfirmOrderNavigation} from './ConfirmOrderNavigation';
import {HomeNavigation} from './HomeNavigation';

import {CategoryListModal} from '../components/CategoryListModal';
import {CustomNavBar} from '../components/CustomNavBar';
import {BranchInfoModal} from '../components/BranchInfoModal';

import {BranchDetailScreen} from '../screens/BranchDetailScreen';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';
import {PromotionDetailScreen} from '../screens/PromotionDetailScreen';
import {PromotionProductsScreen} from '../screens/PromotionProductsScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {SearchProductsScreen} from '../screens/SearchProductsScreen';

export type BranchNavigatorParams = {
  HomeNavigation: any;
  ConfirmOrderNavigation: any;
  BranchDetailScreen: any;
  ProductDetailScreen: any;
  PromotionDetailScreen: any;
  PromotionProductsScreen: any;
  ShoppingCartScreen: any;
  CategoryListModal: any;
  BranchInfoModal: any;
  SearchProductsScreen: any;
};

const BranchStack = createStackNavigator<BranchNavigatorParams>();

export const BranchNavigation = () => {
  return (
    <BranchStack.Navigator screenOptions={{headerShown: false}}>
      <BranchStack.Screen
        name="BranchDetailScreen"
        component={BranchDetailScreen}
      />
      <BranchStack.Group screenOptions={{presentation: 'modal'}}>
        <BranchStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <BranchStack.Screen
          name="ShoppingCartScreen"
          component={ShoppingCartScreen}
        />
        <BranchStack.Screen
          name="ConfirmOrderNavigation"
          component={ConfirmOrderNavigation}
        />
        <BranchStack.Screen
          name="PromotionDetailScreen"
          component={PromotionDetailScreen}
        />
        <BranchStack.Screen
          name="PromotionProductsScreen"
          component={PromotionProductsScreen}
        />
        <BranchStack.Screen
          name="CategoryListModal"
          component={CategoryListModal}
        />
        <BranchStack.Screen
          name="BranchInfoModal"
          component={BranchInfoModal}
        />
        <BranchStack.Screen
          name="SearchProductsScreen"
          component={SearchProductsScreen}
        />
      </BranchStack.Group>

      <BranchStack.Screen name="HomeNavigation" component={HomeNavigation} />
    </BranchStack.Navigator>
  );
};
