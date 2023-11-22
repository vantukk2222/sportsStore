import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupCategorySlice from './reducers/Caregory/getAllCategories';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = combineReducers({
    categories: groupCategorySlice,
    
});
const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // middleware: getDefaultMiddleware => getDefaultMiddleware({
    //     serializableCheck:false
    // })
});
export const persistor = persistStore(store);
