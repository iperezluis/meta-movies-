import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Navigation} from './navigation/Navigation';
import {FadeScreen} from './src/screen/FadeScreen';
import {GradientProvider} from './src/context/GradientContext';

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return <GradientProvider>{children}</GradientProvider>;
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
        {/* <FadeScreen /> */}
      </AppState>
    </NavigationContainer>
  );
};

export default App;
