import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../hooks/useRedux';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {UserOptionsMenuScreen} from '../screens/UserOptionsMenuScreen';
import {SettingsScreen} from '../screens/SettingsScreen';

export type ProfileStackParams = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OptionsUnLoggedScreen: undefined;
  UserOptionsMenuScreen: undefined;
  SettingsScreen: undefined;
};

const ProfileStack = createStackNavigator<ProfileStackParams>();

export const ProfileNavigation = () => {
  const token = useAppSelector(state => state.authToken.token);
  console.log(token);

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
