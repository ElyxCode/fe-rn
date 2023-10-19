import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {PersistGate} from 'redux-persist/integration/react';

import {Provider} from 'react-redux';

import {persistor, store} from './src/utils/store';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import Geocoder from 'react-native-geocoding';
import {enableLatestRenderer} from 'react-native-maps';

import {MainNavigation} from './src/navigator/MainNavigation';

const App = (): JSX.Element => {
  enableLatestRenderer();
  Geocoder.init('AIzaSyCytD23EG5zvcDjToXFyAYnvWcVd-e0ETw');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
