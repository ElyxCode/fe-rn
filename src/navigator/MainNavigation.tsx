import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {UserOptionsMenuScreen} from '../screens/UserOptionsMenuScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {ProfileNavigation} from './ProfileNavigation';
import {CustomNavBarHome} from '../components/CustomNavBarHome';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import { SearchAddressScreen } from '../screens/SearchAddressScreen';
import { CustomNavBar } from '../components/CustomNavBar';

export type RootStackParams = {
  WelcomeScreen: undefined;
  HomeBranchScreen: undefined;
  ProfileNavigation: undefined;
  MapConfirmationScreen: undefined;
  SearchAddressScreen:undefined
};

const MainStack = createStackNavigator<RootStackParams>();

export const MainNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen name="MapConfirmationScreen" component={MapConfirmationScreen}  />
      <MainStack.Screen name="SearchAddressScreen" component={SearchAddressScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}  />
      <MainStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </MainStack.Navigator>
  );
};
