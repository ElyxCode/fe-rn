import {createStackNavigator} from '@react-navigation/stack';

import {AddressListScreen} from '../screens/AddressListScreen';
import {AddressFormScreen} from '../screens/AddressFormScreen';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';

export type AddressStackParams = {
  AddressListScreen: undefined;
  AddressFormScreen: undefined;
  MapConfirmationScreen: undefined;
};

const AddressStack = createStackNavigator<AddressStackParams>();

export const AddressNavigation = () => {
  return (
    <AddressStack.Navigator screenOptions={{headerShown: false}}>
      <>
        <AddressStack.Screen
          name="AddressListScreen"
          component={AddressListScreen}
        />
        <AddressStack.Screen
          name="MapConfirmationScreen"
          component={MapConfirmationScreen}
        />
        <AddressStack.Screen
          name="AddressFormScreen"
          component={AddressFormScreen}
        />
      </>
    </AddressStack.Navigator>
  );
};
