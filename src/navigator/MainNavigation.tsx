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

export type RootStackParams = {
  WelcomeScreen: undefined;
  HomeBranchScreen: undefined;
  ProfileNavigation: undefined;
};

const MainStack = createStackNavigator<RootStackParams>();

export const MainNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </MainStack.Navigator>
  );
};
