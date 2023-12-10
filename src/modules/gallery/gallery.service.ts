import {createApi} from '@reduxjs/toolkit/query/react';

import {baseApi} from '../../utils/api.util';
import {GallerysRoot} from '../../types';

export const galleryApi = createApi({
  reducerPath: 'gallery',
  baseQuery: baseApi(),
  endpoints: builder => ({
    getGalleryPhotos: builder.query<GallerysRoot, number>({
      query: (page: number) =>
        `collections/?client_id=${process.env.API_UNSPLASH_ACCESS_KEY}&page=${page}`,

      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },

      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {useGetGalleryPhotosQuery} = galleryApi;
