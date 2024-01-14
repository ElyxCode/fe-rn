import {createStackNavigator} from '@react-navigation/stack';

import {useAppSelector} from '../hooks/useRedux';

import {ProductProps} from '../model/ProductProps';

import {HomeNavigation} from './HomeNavigation';
import {ConfirmOrderNavigation} from '../navigator/ConfirmOrderNavigation';
import {ProfileNavigation} from './ProfileNavigation';
import {SignInNavigation} from './SignInNavigation';

import {CustomNavBar} from '../components/CustomNavBar';
import {BranchInfoModal} from '../components/BranchInfoModal';
import {CategoryListModal} from '../components/CategoryListModal';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {BranchDetailScreen} from '../screens/BranchDetailScreen';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {SearchAddressScreen} from '../screens/SearchAddressScreen';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {AddressListScreen} from '../screens/AddressListScreen';

export type RootStackParams = {
  WelcomeScreen: undefined;
  BranchDetailScreen: any;
  ProfileNavigation: undefined;
  SignInNavigation: undefined;
  MapConfirmationScreen: undefined;
  SearchAddressScreen: undefined;
  SearchAddressScreenn: undefined;
  HomeNavigation: undefined;
  BranchInfoModal: any;
  CategoryListModal: any;
  ProductDetailScreen: ProductProps;
  ShoppingCartScreen: any;
  ConfirmOrderScreen: any;
  AddressListScreen: any;
  ConfirmOrderNavigation: any;
};

const MainStack = createStackNavigator<RootStackParams>();

export const MainNavigation = () => {
  const token = useAppSelector(state => state.authToken.token);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen
        name="MapConfirmationScreen"
        component={MapConfirmationScreen}
      />
      <MainStack.Screen
        name="SearchAddressScreen"
        component={SearchAddressScreen}
        options={{headerShown: true, header: () => <CustomNavBar />}}
      />

      <MainStack.Screen name="HomeNavigation" component={HomeNavigation} />
      <MainStack.Screen
        name="AddressListScreen"
        component={AddressListScreen}
      />
      <MainStack.Group screenOptions={{presentation: 'modal'}}>
        <MainStack.Screen
          name="BranchDetailScreen"
          component={BranchDetailScreen}
        />
        <MainStack.Screen name="BranchInfoModal" component={BranchInfoModal} />
        <MainStack.Screen
          name="ProductDetailScreen"
          component={ProductDetailScreen}
        />
        <MainStack.Screen
          name="CategoryListModal"
          component={CategoryListModal}
        />
        <MainStack.Screen
          name="ShoppingCartScreen"
          component={ShoppingCartScreen}
        />
        <MainStack.Screen
          name="ConfirmOrderNavigation"
          component={ConfirmOrderNavigation}
        />
        <MainStack.Screen
          name="SignInNavigation"
          component={SignInNavigation}
        />
      </MainStack.Group>
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </MainStack.Navigator>
  );
};
