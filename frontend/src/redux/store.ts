import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from '~/screens/Account/authSlice'
import provinceReducer from '~/redux/province/provinceSlice'
import searchReducer from '~/redux/search/searchSlice'
import homeReducer from '~/screens/Home/homeSlice'

const rootReducer = combineReducers({ authReducer, provinceReducer, searchReducer, homeReducer })

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
