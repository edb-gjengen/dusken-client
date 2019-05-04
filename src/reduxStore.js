import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from "redux-thunk";

import rootReducer from './reducers'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'isLoggingIn',
    'isFetchingUserData',
    'isRegisteringUser',
    'isChargingMembership'
  ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(
  persistedReducer,
  applyMiddleware(...[thunk])
);
export let persistor = persistStore(store);