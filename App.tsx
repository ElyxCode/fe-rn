import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {MainNavigation} from './src/navigator/MainNavigation';

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
