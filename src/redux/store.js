import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupCategorySlice from '~/redux/reducers/Caregory/getAllCategories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginSlice from './reducers/Login/signinReducer';
const rootReducer = combineReducers({
    categories: groupCategorySlice,
    loginUser: loginSlice,
});
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});
export const persistor = persistStore(store);
