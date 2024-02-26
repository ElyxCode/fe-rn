import {createStackNavigator} from '@react-navigation/stack';

import {HomeNavigation} from './HomeNavigation';

import {WelcomeScreen} from '../screens/WelcomeScreen';

import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {SearchAddressScreen} from '../screens/SearchAddressScreen';
import {AddressListScreen} from '../screens/AddressListScreen';

export type MainStackParams = {
  HomeNavigation: undefined;
  WelcomeScreen: undefined;
  MapConfirmationScreen: undefined;
  SearchAddressScreen: undefined;
  AddressListScreen: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const MainNavigation = () => {
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
      />
      <MainStack.Screen
        name="AddressListScreen"
        component={AddressListScreen}
      />
      <MainStack.Screen name="HomeNavigation" component={HomeNavigation} />
    </MainStack.Navigator>
  );
};
