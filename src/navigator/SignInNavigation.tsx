import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {SignUpComplementScreen} from '../screens/SignUpComplementScreen';
import {SignUpWelcomeScreen} from '../screens/SignUpWelcomeScreen';
import {BiometricDetailScreen} from '../screens/BiometricDetailScreen';

export type RootStackParams = {
  LoginScreen: any;
  SignUpScreen: any;
  SignUpComplementScreen: any;
  SignUpWelcomeScreen: any;
  BiometricDetailScreen: any;
};

const SignIn = createStackNavigator<RootStackParams>();

export const SignInNavigation = () => {
  return (
    <SignIn.Navigator screenOptions={{headerShown: false}}>
      <SignIn.Screen name="LoginScreen" component={LoginScreen} />
      <SignIn.Screen name="SignUpScreen" component={SignUpScreen} />
      <SignIn.Screen
        name="SignUpComplementScreen"
        component={SignUpComplementScreen}
      />
      <SignIn.Screen
        name="SignUpWelcomeScreen"
        component={SignUpWelcomeScreen}
      />
      <SignIn.Screen
        name="BiometricDetailScreen"
        component={BiometricDetailScreen}
      />
    </SignIn.Navigator>
  );
};
