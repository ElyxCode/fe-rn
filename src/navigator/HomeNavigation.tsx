import { createStackNavigator } from "@react-navigation/stack";
import {MapConfirmationScreen} from '../screens/MapConfirmationScreen';
import {HomeBranchScreen} from '../screens/HomeBranchScreen';
import { SearchAddressScreen } from "../screens/SearchAddressScreen";
import { CustomNavBar } from "../components/CustomNavBar";
import {PromotionDetailScreen} from "../screens/PromotionDetailScreen"
import { PromotionProductsScreen } from "../screens/PromotionProductsScreen";

export type HomeStackParams = {
   
    HomeBranchScreen: undefined;
    MapConfirmationScreen: undefined;
   SearchAddressScreen:undefined;
   PromotionDetailScreen:any;
   PromotionProductsScreen:any;
  
  };

const HomeStack = createStackNavigator<HomeStackParams>();

export const HomeNavigation = () => {

    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeBranchScreen">
        <HomeStack.Screen name="HomeBranchScreen" component={HomeBranchScreen} />
        <HomeStack.Screen name="MapConfirmationScreen" component={MapConfirmationScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}/>
      <HomeStack.Screen name="SearchAddressScreen" component={SearchAddressScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}  />
      <HomeStack.Screen name="PromotionDetailScreen" component={PromotionDetailScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}  />
      <HomeStack.Screen name="PromotionProductsScreen" component={PromotionProductsScreen} options={{headerShown:true, header: ()=> (<CustomNavBar  />)}}  />
    
      </HomeStack.Navigator>

    )
}