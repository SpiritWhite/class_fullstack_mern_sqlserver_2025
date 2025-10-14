import { configureStore } from '@reduxjs/toolkit';
import reducers from '../reducer/reducer';

const store = configureStore({
  reducer: reducers,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {},
      },
      serializableCheck: false,
    }).concat([]),
});

export default store;