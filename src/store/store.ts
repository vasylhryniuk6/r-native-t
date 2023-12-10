import {galleryApi} from '../modules/gallery/gallery.service';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [galleryApi.reducerPath]: galleryApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(galleryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
