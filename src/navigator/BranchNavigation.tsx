import {createStackNavigator} from '@react-navigation/stack';

import {ConfirmOrderNavigation} from './ConfirmOrderNavigation';

import {CategoryListModal} from '../components/CategoryListModal';

import {BranchDetailScreen} from '../screens/BranchDetailScreen';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';
import {PromotionDetailScreen} from '../screens/PromotionDetailScreen';
import {PromotionProductsScreen} from '../screens/PromotionProductsScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {HomeNavigation} from './HomeNavigation';
import {BranchInfoModal} from '../components/BranchInfoModal';
import {useAppSelector} from '../hooks/useRedux';
import {CustomNavBar} from '../components/CustomNavBar';

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
          options={{headerShown: true, header: () => <CustomNavBar />}}
        />
        <BranchStack.Screen
          name="PromotionProductsScreen"
          component={PromotionProductsScreen}
          options={{headerShown: true, header: () => <CustomNavBar />}}
        />
        <BranchStack.Screen
          name="CategoryListModal"
          component={CategoryListModal}
        />
        <BranchStack.Screen
          name="BranchInfoModal"
          component={BranchInfoModal}
        />
      </BranchStack.Group>

      <BranchStack.Screen name="HomeNavigation" component={HomeNavigation} />
    </BranchStack.Navigator>
  );
};
