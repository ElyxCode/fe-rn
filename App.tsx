import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {RecoilRoot} from 'recoil';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {Navigation} from './src/navigator/Navigation';
import Geocoder from 'react-native-geocoding';
import {enableLatestRenderer} from 'react-native-maps';


import {MainNavigation} from './src/navigator/MainNavigation';

const App = (): JSX.Element => {

  enableLatestRenderer();
  Geocoder.init("AIzaSyCytD23EG5zvcDjToXFyAYnvWcVd-e0ETw");

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </RecoilRoot>
  );
};

export default App;
