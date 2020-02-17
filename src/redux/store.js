import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from './reducer';
import AsyncStorage from '@react-native-community/async-storage';

const middlewares = [
    logger
];

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };
