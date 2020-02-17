import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './src/navigators/bottomNav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <BottomNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
