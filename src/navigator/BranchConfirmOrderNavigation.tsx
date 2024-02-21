import {createStackNavigator} from '@react-navigation/stack';

import {useAppSelector} from '../hooks/useRedux';

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

export type BranchConfirmationNavigatorParams = {
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

const BranchConfirmationStack =
  createStackNavigator<BranchConfirmationNavigatorParams>();

export const BranchConfirmOrderNavigation = () => {
  const products = useAppSelector(state => state.productsCart.products);
  return (
    <BranchConfirmationStack.Navigator screenOptions={{headerShown: false}}>
      {products.length !== 0 ? (
        <>
          <BranchConfirmationStack.Group
            screenOptions={{presentation: 'modal'}}>
            <BranchConfirmationStack.Screen
              name="BranchDetailScreen"
              component={BranchDetailScreen}
            />
            <BranchConfirmationStack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
            />
            <BranchConfirmationStack.Screen
              name="ShoppingCartScreen"
              component={ShoppingCartScreen}
            />
            <BranchConfirmationStack.Screen
              name="ConfirmOrderNavigation"
              component={ConfirmOrderNavigation}
            />
            <BranchConfirmationStack.Screen
              name="PromotionDetailScreen"
              component={PromotionDetailScreen}
            />
            <BranchConfirmationStack.Screen
              name="PromotionProductsScreen"
              component={PromotionProductsScreen}
            />
            <BranchConfirmationStack.Screen
              name="CategoryListModal"
              component={CategoryListModal}
            />
            <BranchConfirmationStack.Screen
              name="BranchInfoModal"
              component={BranchInfoModal}
            />
            <BranchConfirmationStack.Screen
              name="SearchProductsScreen"
              component={SearchProductsScreen}
            />
          </BranchConfirmationStack.Group>
        </>
      ) : (
        <BranchConfirmationStack.Screen
          name="HomeNavigation"
          component={HomeNavigation}
        />
      )}
    </BranchConfirmationStack.Navigator>
  );
};
