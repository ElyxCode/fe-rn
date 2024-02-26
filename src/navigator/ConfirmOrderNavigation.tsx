import {createStackNavigator} from '@react-navigation/stack';

import {CardNavigation} from './CardNavigation';
import {AddressNavigation} from './AddressNavigation';
import {BranchConfirmOrderNavigation} from './BranchConfirmOrderNavigation';

import {DeliveryInfoModal} from '../components/DeliveryInfoModal';

import {PhoneNumberScreen} from '../screens/PhoneNumberScreen';
import {BillingInfoScreen} from '../screens/BillingInfoScreen';
import {PromoCodeScreen} from '../screens/PromoCodeScreen';
import {ConfirmOrderScreen} from '../screens/ConfirmOrderScreen';
import {OrderDetailScreen} from '../screens/OrderDetailScreen';
import {TransferScreen} from '../screens/TransferScreen';

export type ConfirmOrderParams = {
  HomeNavigation: undefined;
  AddressNavigation: undefined;
  CardNavigation: undefined;
  BranchConfirmOrderNavigation: undefined;
  ConfirmOrderScreen: undefined;
  DeliveryInfoModal: undefined;
  OrderDetailScreen: undefined;
  TransferScreen: undefined;
  PhoneNumberScreen: undefined;
  BillingInfoScreen: undefined;
  PromoCodeScreen: undefined;
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
      <ConfirmOrderStack.Screen
        name="BranchConfirmOrderNavigation"
        component={BranchConfirmOrderNavigation}
      />
      <ConfirmOrderStack.Screen
        name="PhoneNumberScreen"
        component={PhoneNumberScreen}
      />
      <ConfirmOrderStack.Screen
        name="BillingInfoScreen"
        component={BillingInfoScreen}
      />
      <ConfirmOrderStack.Screen
        name="PromoCodeScreen"
        component={PromoCodeScreen}
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
