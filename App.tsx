import 'react-native-gesture-handler';
import {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import {NavigationContainer} from '@react-navigation/native';

import {Navigation} from './src/navigator/Navigation';
import {enableLatestRenderer} from 'react-native-maps';



const App = (): JSX.Element => {
  enableLatestRenderer();
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
