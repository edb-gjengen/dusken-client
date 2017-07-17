import DuskenContainer from "./src/DuskenContainer";
import {AppRegistry} from "react-native";
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import duskenApp from "./src/reducers";

let store = createStore(duskenApp);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DuskenContainer />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('Dusken', () => App);
