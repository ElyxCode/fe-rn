import {createStackNavigator} from '@react-navigation/stack';

import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';

export type UnloggedStackParams = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OptionsUnLoggedScreen: undefined;
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
    </UnloggedStack.Navigator>
  );
};
