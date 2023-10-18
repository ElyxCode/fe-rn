import 'react-native-gesture-handler';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {Navigation} from './src/navigator/Navigation';
import Geocoder from 'react-native-geocoding';
import {enableLatestRenderer} from 'react-native-maps';



const App = (): JSX.Element => {

  enableLatestRenderer();
  Geocoder.init("AIzaSyCytD23EG5zvcDjToXFyAYnvWcVd-e0ETw");

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
