import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../hooks/useRedux';

import {AddressNavigation} from './AddressNavigation';
import {CardNavigation} from './CardNavigation';

import {DeleteAccountModal} from '../components/DeleteAccountModal';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {UserOptionsMenuScreen} from '../screens/UserOptionsMenuScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen';
import {OrderListScreen} from '../screens/OrderListScreen';
import {OrderDetailScreen} from '../screens/OrderDetailScreen';
import {AddressListScreen} from '../screens/AddressListScreen';
import {DeleteAccountScreen} from '../screens/DeleteAccountScreen';
import {SignUpComplementScreen} from '../screens/SignUpComplementScreen';
import {SignUpWelcomeScreen} from '../screens/SignUpWelcomeScreen';
import {BiometricDetailScreen} from '../screens/BiometricDetailScreen';

export type ProfileStackParams = {
  LoginScreen: any;
  SignUpScreen: any;
  OptionsUnLoggedScreen: any;
  UserOptionsMenuScreen: any;
  SettingsScreen: any;
  EditProfileScreen: any;
  OrderListScreen: any;
  OrderDetailScreen: any;
  CardNavigation: any;
  AddressNavigation: any;
  AddressListScreen: any;
  DeleteAccountScreen: any;
  SignUpComplementScreen: any;
  SignUpWelcomeScreen: any;
  BiometricDetailScreen: any;
  DeleteAccountModal: any;
};

const ProfileStack = createStackNavigator<ProfileStackParams>();

export const ProfileNavigation = () => {
  const isLoggedIn = useAppSelector(state => state.authToken.isLoggedIn);

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedIn ? (
        <>
          <ProfileStack.Screen
            name="UserOptionsMenuScreen"
            component={UserOptionsMenuScreen}
          />
          <ProfileStack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
          />
          <ProfileStack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <ProfileStack.Screen
            name="OrderListScreen"
            component={OrderListScreen}
          />
          <ProfileStack.Screen
            name="OrderDetailScreen"
            component={OrderDetailScreen}
          />
          <ProfileStack.Screen
            name="CardNavigation"
            component={CardNavigation}
          />
          <ProfileStack.Screen
            name="AddressNavigation"
            component={AddressNavigation}
          />
          <ProfileStack.Screen
            name="AddressListScreen"
            component={AddressListScreen}
          />
          <ProfileStack.Screen
            name="DeleteAccountScreen"
            component={DeleteAccountScreen}
          />
          <ProfileStack.Screen
            name="SignUpComplementScreen"
            component={SignUpComplementScreen}
          />
          <ProfileStack.Screen
            name="SignUpWelcomeScreen"
            component={SignUpWelcomeScreen}
          />
          <ProfileStack.Screen
            name="BiometricDetailScreen"
            component={BiometricDetailScreen}
          />
          <ProfileStack.Group screenOptions={{presentation: 'modal'}}>
            <ProfileStack.Screen
              name="DeleteAccountModal"
              component={DeleteAccountModal}
            />
          </ProfileStack.Group>
        </>
      ) : (
        <>
          <ProfileStack.Screen
            name="OptionsUnLoggedScreen"
            component={OptionsUnLoggedScreen}
          />
          <ProfileStack.Screen name="LoginScreen" component={LoginScreen} />
          <ProfileStack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </ProfileStack.Navigator>
  );
};
