import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';
import 'react-native-gesture-handler';
import Router from './Router';
import { NavigationContainer } from '@react-navigation/native';

console.disableYellowBox = true;
class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;