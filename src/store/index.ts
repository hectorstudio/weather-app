import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AnyAction, combineReducers, EmptyObject } from 'redux';
import logger from 'redux-logger';

import { weatherCastReducer, WeatherCastState } from './weatherCastReducer';

const reducers = combineReducers({
  weatherCast: weatherCastReducer,
});

const middlewareConfig = {
  serializableCheck: false
};

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== 'production') {
      return getDefaultMiddleware(middlewareConfig).concat(logger);
    }
    return getDefaultMiddleware(middlewareConfig);
  }
});

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): ThunkDispatch<
  EmptyObject & {
    weatherCast: WeatherCastState;
  },
  undefined,
  AnyAction
> => useDispatch<AppDispatch>();

export { store };
