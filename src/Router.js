import React, { Component } from 'react';

import AddressAddEditScreen from './Components/AddressAddEditScreen';
import AddressListScreen from './Components/AddressListScreen';

import { createStackNavigator } from '@react-navigation/stack';

const MainStack = createStackNavigator();

class Router extends Component {
  render() {
    return (
      <MainStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#841584',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        
        <MainStack.Screen
          component={AddressListScreen}
          name="AddressListScreen"
          options={{ title: 'Contact list' }}
        />
        <MainStack.Screen
          component={AddressAddEditScreen}
          name="AddressAddEditScreen"
          options={{ title: 'Add / Edit details' }}
        />
      </MainStack.Navigator>
    );
  }

}

export default Router;