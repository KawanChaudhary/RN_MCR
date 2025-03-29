import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {DRAWER_NAV} from './constants';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={DRAWER_NAV[0].name}>
        {DRAWER_NAV.map(drawer => (
          <Drawer.Screen
            key={drawer.id}
            name={drawer.name}
            component={drawer.component}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
