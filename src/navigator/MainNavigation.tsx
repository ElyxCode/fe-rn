import {createStackNavigator} from '@react-navigation/stack';

import {WelcomeScreen} from '../screens/WelcomeScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import {ProfileNavigation} from './ProfileNavigation';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {useAppSelector} from '../hooks/useRedux';

export type RootStackParams = {
  WelcomeScreen: undefined;
  HomeBranchScreen: undefined;
  ProfileNavigation: undefined;
  MapConfirmationScreen: undefined;
};

const MainStack = createStackNavigator<RootStackParams>();

export const MainNavigation = () => {
  const token = useAppSelector(state => state.authToken.token);

  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <MainStack.Screen
        name="MapConfirmationScreen"
        component={MapConfirmationScreen}
      />
      <MainStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
      <MainStack.Screen
        name="ProfileNavigation"
        component={ProfileNavigation}
      />
    </MainStack.Navigator>
  );
};
