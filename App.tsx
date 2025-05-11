import 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/Navigation/RootNavigator';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
