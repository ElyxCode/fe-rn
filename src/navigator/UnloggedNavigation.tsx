import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {SignUpComplementScreen} from '../screens/SignUpComplementScreen';
import {SignUpWelcomeScreen} from '../screens/SignUpWelcomeScreen';
import {BiometricDetailScreen} from '../screens/BiometricDetailScreen';

export type UnloggedStackParams = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OptionsUnLoggedScreen: undefined;
  SignUpComplementScreen: undefined;
  SignUpWelcomeScreen: undefined;
  BiometricDetailScreen: undefined;
};

const UnloggedStack = createStackNavigator<UnloggedStackParams>();

export const UnloggedNavigation = () => {
  return (
    <UnloggedStack.Navigator screenOptions={{headerShown: false}}>
      <UnloggedStack.Screen
        name="OptionsUnLoggedScreen"
        component={OptionsUnLoggedScreen}
      />
      <UnloggedStack.Screen name="LoginScreen" component={LoginScreen} />
      <UnloggedStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <UnloggedStack.Screen
        name="SignUpComplementScreen"
        component={SignUpComplementScreen}
      />
      <UnloggedStack.Screen
        name="SignUpWelcomeScreen"
        component={SignUpWelcomeScreen}
      />
      <UnloggedStack.Screen
        name="BiometricDetailScreen"
        component={BiometricDetailScreen}
      />
    </UnloggedStack.Navigator>
  );
};
