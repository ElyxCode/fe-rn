import { createStackNavigator } from "@react-navigation/stack";
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import { SearchAddressScreen } from "../screens/SearchAddressScreen";
import { CustomNavBar } from "../components/CustomNavBar";

export type HomeStackParams = {
   
    HomeBranchScreen: undefined;
    MapConfirmationScreen: undefined;
  SearchAddressScreen:undefined;
  };

const HomeStack = createStackNavigator<HomeStackParams>();

export const HomeNavigation = () => {

    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeBranchScreen">
        <HomeStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
        <HomeStack.Screen name="MapConfirmationScreen" component={MapConfirmationScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}/>
      <HomeStack.Screen name="SearchAddressScreen" component={SearchAddressScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}  />
      </HomeStack.Navigator>

    )
}