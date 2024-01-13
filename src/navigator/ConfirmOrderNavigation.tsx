import {createStackNavigator} from '@react-navigation/stack';

import {HomeNavigation} from './HomeNavigation';
import {CardNavigation} from './CardNavigation';
import {AddressNavigation} from './AddressNavigation';

import {DeliveryInfoModal} from '../components/DeliveryInfoModal';

import {ConfirmOrderScreen} from '../screens/ConfirmOrderScreen';
import {OrderDetailScreen} from '../screens/OrderDetailScreen';

export type ConfirmOrderParams = {
  HomeNavigation: undefined;
  AddressNavigation: any;
  CardNavigation: any;
  ConfirmOrderScreen: any;
  DeliveryInfoModal: any;
  OrderDetailScreen: any;
};

const ConfirmOrderStack = createStackNavigator<ConfirmOrderParams>();

export const ConfirmOrderNavigation = () => {
  return (
    <ConfirmOrderStack.Navigator screenOptions={{headerShown: false}}>
      <ConfirmOrderStack.Screen
        name="ConfirmOrderScreen"
        component={ConfirmOrderScreen}
      />
      <ConfirmOrderStack.Screen
        name="CardNavigation"
        component={CardNavigation}
      />
      <ConfirmOrderStack.Screen
        name="AddressNavigation"
        component={AddressNavigation}
      />
      <ConfirmOrderStack.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
      />
      <ConfirmOrderStack.Group screenOptions={{presentation: 'modal'}}>
        <ConfirmOrderStack.Screen
          name="DeliveryInfoModal"
          component={DeliveryInfoModal}
        />
      </ConfirmOrderStack.Group>
    </ConfirmOrderStack.Navigator>
  );
};
