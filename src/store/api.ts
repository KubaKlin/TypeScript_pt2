import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://baconipsum.com/api/?type=all-meat',
  }),
  endpoints: (builder) => ({
    getTextWithParams: builder.query<string[], number>({
      query: (paragraphs: number) => `&paras=${paragraphs}`,
    }),
    getTextWithSentences: builder.query<string[], number>({
      query: (sentences: number) => `&sentences=${sentences}`,
    }),
  }),
});

export const { useGetTextWithParamsQuery, useGetTextWithSentencesQuery } = api;
