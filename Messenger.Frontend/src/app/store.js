import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import rootReducer from '../features';

export const store = configureStore({
	reducer: rootReducer,
	middleware: () =>
		// eslint-disable-next-line implicit-arrow-linebreak
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
