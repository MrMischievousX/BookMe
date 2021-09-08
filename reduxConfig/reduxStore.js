import { createStore } from 'redux';
import { reducer } from './reducer';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [
        encryptTransform({
            secretKey: 'bookMe',
            onError: (error) => {
                console.log(error);
            },
        }),
    ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
    let store = createStore(persistedReducer);
    let persistor = persistStore(store);
    return { store, persistor };
};