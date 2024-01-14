import {createStackNavigator} from '@react-navigation/stack';

import {CardFormScreen} from '../screens/CardFormScreen';
import {CardsScreen} from '../screens/CardsScreen';

export type CardNavigatorParams = {
  CardsScreen: any;
  CardFormScreen: any;
};

const CardStack = createStackNavigator<CardNavigatorParams>();

export const CardNavigation = () => {
  return (
    <CardStack.Navigator screenOptions={{headerShown: false}}>
      <CardStack.Screen name="CardsScreen" component={CardsScreen} />
      <CardStack.Screen name="CardFormScreen" component={CardFormScreen} />
    </CardStack.Navigator>
  );
};
