import {fetchBaseQuery} from '@reduxjs/toolkit/query';

const baseUrl = process.env.API_URL;

export const baseApi = () => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  });
};
