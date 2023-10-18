import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {RecoilRoot} from 'recoil';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {MainNavigation} from './src/navigator/MainNavigation';

const App = (): JSX.Element => {
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
