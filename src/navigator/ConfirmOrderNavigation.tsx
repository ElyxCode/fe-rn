import {createStackNavigator} from '@react-navigation/stack';

import {CardNavigation} from './CardNavigation';
import {AddressNavigation} from './AddressNavigation';

import {DeliveryInfoModal} from '../components/DeliveryInfoModal';
import {PhoneNumberModal} from '../components/PhoneNumberModal';
import {BillingInfoModal} from '../components/BillingInfoModal';
import {PromoCodeModal} from '../components/PromoCodeModal';

import {ConfirmOrderScreen} from '../screens/ConfirmOrderScreen';
import {OrderDetailScreen} from '../screens/OrderDetailScreen';
import {TransferScreen} from '../screens/TransferScreen';

export type ConfirmOrderParams = {
  HomeNavigation: undefined;
  AddressNavigation: any;
  CardNavigation: any;
  ConfirmOrderScreen: any;
  DeliveryInfoModal: any;
  OrderDetailScreen: any;
  TransferScreen: any;
  PhoneNumberModal: any;
  BillingInfoModal: any;
  PromoCodeModal: any;
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
      <ConfirmOrderStack.Screen
        name="TransferScreen"
        component={TransferScreen}
      />
      <ConfirmOrderStack.Group screenOptions={{presentation: 'modal'}}>
        <ConfirmOrderStack.Screen
          name="DeliveryInfoModal"
          component={DeliveryInfoModal}
        />
        <ConfirmOrderStack.Screen
          name="PhoneNumberModal"
          component={PhoneNumberModal}
        />
        <ConfirmOrderStack.Screen
          name="BillingInfoModal"
          component={BillingInfoModal}
        />
        <ConfirmOrderStack.Screen
          name="PromoCodeModal"
          component={PromoCodeModal}
        />
      </ConfirmOrderStack.Group>
    </ConfirmOrderStack.Navigator>
  );
};
