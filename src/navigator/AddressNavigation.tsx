import {createStackNavigator} from '@react-navigation/stack';
import {useAppSelector} from '../hooks/useRedux';

import {AddressListScreen} from '../screens/AddressListScreen';
import {AddressFormScreen} from '../screens/AddressFormScreen';
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {CustomNavBar} from '../components/CustomNavBar';

export type AddressStackParams = {
  AddressListScreen: any;
  AddressFormScreen: any;
  MapConfirmationScreen: any;
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
          options={{headerShown: true, header: () => <CustomNavBar />}}
        />

        <AddressStack.Screen
          name="AddressFormScreen"
          component={AddressFormScreen}
        />
      </>
    </AddressStack.Navigator>
  );
};
