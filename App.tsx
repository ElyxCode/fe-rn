import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {Provider} from 'react-redux';

import {store} from './src/utils/store';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {MainNavigation} from './src/navigator/MainNavigation';

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
