import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import {SignUpScreen} from '../screens/SignUpScreen';
import {OptionsUnLoggedScreen} from '../screens/OptionsUnLoggedScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';

export type RootStackParams = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  OptionsUnLoggedScreen: undefined;
  HomeBranchScreen: undefined;
  MapConfirmationScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
      {/* <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
      {/* <Stack.Screen
        name="OptionsUnLoggedScreen"
        component={OptionsUnLoggedScreen}
      /> */}
      {/* <Stack.Screen name="HomeBranchScreen" component={HomeBranchScreen} /> */}
      <Stack.Screen name="MapConfirmationScreen" component={MapConfirmationScreen} />
    </Stack.Navigator>
  );
};
