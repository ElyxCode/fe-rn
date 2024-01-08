import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {BranchDetailScreen} from '../screens/BranchDetailScreen';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {SearchAddressScreen} from '../screens/SearchAddressScreen';
import {CustomNavBar} from '../components/CustomNavBar';
import {useAppSelector} from '../hooks/useRedux';
import {HomeNavigation} from './HomeNavigation';
import {BranchInfoModal} from '../components/BranchInfoModal';
import {CategoryListModal} from '../components/CategoryListModal';
import {ProductDetailScreen} from '../screens/ProductDetailScreen';
import {ShoppingCartScreen} from '../screens/ShoppingCartScreen';
import {ConfirmOrderScreen} from '../screens/ConfirmOrderScreen';
import {ProductProps} from '../model/ProductProps';
import {ProfileNavigation} from './ProfileNavigation';
import {SignInNavigation} from './SignInNavigation';

export type RootStackParams = {
  WelcomeScreen: undefined;
  HomeBranchScreen: undefined;
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
          name="ConfirmOrderScreen"
          component={ConfirmOrderScreen}
        />
        <MainStack.Screen
          name="SignInNavigation"
          component={SignInNavigation}
        />
      </MainStack.Group>
      {/* <MainStack.Screen
        name="BranchDetailScreen"
        component={BranchDetailScreen}
      /> */}
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </MainStack.Navigator>
  );
};
