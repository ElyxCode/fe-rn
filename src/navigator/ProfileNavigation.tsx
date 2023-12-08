import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../hooks/useRedux';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {UserOptionsMenuScreen} from '../screens/UserOptionsMenuScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {EditProfileScreen} from '../screens/EditProfileScreen';
import {OrderListScreen} from '../screens/OrderListScreen';
import {OrderDetailScreen} from '../screens/OrderDetailScreen';
import {CardsScreen} from '../screens/CardsScreen';
import {CardFormScreen} from '../screens/CardFormScreen';
import {AddressListScreen} from '../screens/AddressListScreen';
import {DeleteAccountScreen} from '../screens/DeleteAccountScreen';
import {SignUpComplementScreen} from '../screens/SignUpComplementScreen';
import {SignUpWelcomeScreen} from '../screens/SignUpWelcomeScreen';
import {BiometricDetailScreen} from '../screens/BiometricDetailScreen';
import {DeleteAccountModal} from '../components/DeleteAccountModal';

export type ProfileStackParams = {
  LoginScreen: any;
  SignUpScreen: any;
  OptionsUnLoggedScreen: any;
  UserOptionsMenuScreen: any;
  SettingsScreen: any;
  EditProfileScreen: any;
  OrderListScreen: any;
  OrderDetailScreen: any;
  CardsScreen: any;
  CardFormScreen: any;
  AddressListScreen: any;
  DeleteAccountScreen: any;
  SignUpComplementScreen: any;
  SignUpWelcomeScreen: any;
  BiometricDetailScreen: any;
  DeleteAccountModal: any;
};

const ProfileStack = createStackNavigator<ProfileStackParams>();

export const ProfileNavigation = () => {
  const token = useAppSelector(state => state.authToken.token);

  return (
    <ProfileStack.Navigator screenOptions={{headerShown: false}}>
      {token ? (
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
          <ProfileStack.Screen name="CardsScreen" component={CardsScreen} />
          <ProfileStack.Screen
            name="CardFormScreen"
            component={CardFormScreen}
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
