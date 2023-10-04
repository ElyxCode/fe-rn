import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {LoginScreen} from '../screens/LoginScreen';

export type RootStackParams = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
};
