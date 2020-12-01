import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Items from '../pages/Items';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#ffffff' },
    }}
  >
    <App.Screen name="Items" component={Items} />
  </App.Navigator>
);

export default AppRoutes;
