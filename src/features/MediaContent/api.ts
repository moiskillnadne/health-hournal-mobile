import { baseApi } from '@app/state';
import { ListQueryResponse, ListQueryParameters } from '@app/types';

import { Article, Video, MediaContent, Track, ContentSummary } from './types';

export type UpdateMediaContent = Partial<MediaContent> & { id: string };

export type TracksResponse = Track[];
export type VitalContentResponse = ContentSummary[];
export type FavoriteContentResponse = ContentSummary[];

export type NewContentIdsResponse = {
  videos: string[];
  articles: string[];
  recipes: string[];
};

export type CheckNewVitalContentResponse = {
  videos: boolean;
  articles: boolean;
};

const TAGS = [
  'Videos',
  'Video',
  'Articles',
  'Article',
  'VideoTracks',
  'VitalVideos',
  'FavoriteVideos',
  'ArticleTracks',
  'VitalArticles',
  'FavoriteArticles',
  'RecipeTracks',
  'FavoriteRecipes',
  'GalleryVideos',
  'GalleryArticles',
  'NewContentIds',
  'HasNewVitalContent',
  'FoodVideos',
  'FoodRecipes',
] as const;

export const api = baseApi
  .enhanceEndpoints({
    addTagTypes: TAGS,
  })
  .injectEndpoints({
    endpoints: builder => ({
      fetchArticles: builder.query<ListQueryResponse<Article>, ListQueryParameters>({
        query: params => ({
          url: 'gallery/articles',
          method: 'GET',
          params,
        }),
        providesTags: ['GalleryArticles'],
      }),
      fetchVideos: builder.query<ListQueryResponse<Video>, ListQueryParameters>({
        query: params => ({
          url: 'gallery/videos',
          method: 'GET',
          params,
        }),
        providesTags: ['GalleryVideos'],
      }),
      fetchVideo: builder.query<Video, string>({
        query: id => ({
          url: `gallery/video/${id}`,
          method: 'GET',
        }),
        providesTags: ['Video'],
      }),
      fetchArticle: builder.query<Article, string>({
        query: id => ({
          url: `gallery/article/${id}`,
          method: 'GET',
        }),
        providesTags: ['Article'],
      }),

      updateVideo: builder.mutation<void, UpdateMediaContent>({
        query: ({ id, ...video }) => ({
          url: `gallery/video/${id}`,
          method: 'PATCH',
          body: video,
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            api.util.updateQueryData('fetchVideo', id, draft => {
              Object.assign(draft, patch);
            }),
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: [
          'Videos',
          'VitalVideos',
          'VideoTracks',
          'GalleryVideos',
          'HasNewVitalContent',
          'NewContentIds',
          'FavoriteVideos',
          'FoodVideos',
        ],
      }),
      updateArticle: builder.mutation<void, UpdateMediaContent>({
        query: ({ id, ...article }) => ({
          url: `gallery/article/${id}`,
          method: 'PATCH',
          body: article,
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            api.util.updateQueryData('fetchArticle', id, draft => {
              Object.assign(draft, patch);
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: [
          'Articles',
          'ArticleTracks',
          'VitalArticles',
          'GalleryArticles',
          'HasNewVitalContent',
          'NewContentIds',
          'FavoriteArticles',
        ],
      }),
      updateRecipe: builder.mutation<void, UpdateMediaContent>({
        query: ({ id, ...recipe }) => ({
          url: `gallery/recipe/${id}`,
          method: 'PATCH',
          body: recipe,
        }),
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            api.util.updateQueryData('fetchArticle', id, draft => {
              Object.assign(draft, patch);
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: [
          'Articles',
          'ArticleTracks',
          'GalleryArticles',
          'HasNewVitalContent',
          'NewContentIds',
          'FavoriteArticles',
          'FavoriteRecipes',
          'FoodRecipes',
          'RecipeTracks',
        ],
      }),

      fetchVideoTracks: builder.query<TracksResponse, void>({
        query: () => ({
          url: 'user/tracks/video',
          method: 'GET',
        }),
        providesTags: ['VideoTracks'],
      }),
      fetchVitalVideos: builder.query<VitalContentResponse, void>({
        query: () => ({
          url: 'user/vitals/video',
          method: 'GET',
        }),
        providesTags: ['VitalVideos'],
      }),
      fetchFavoriteVideos: builder.query<FavoriteContentResponse, void>({
        query: () => ({
          url: 'user/videos/favourite',
          method: 'GET',
        }),
        providesTags: ['FavoriteVideos'],
      }),

      fetchArticleTracks: builder.query<TracksResponse, void>({
        query: () => ({
          url: 'user/tracks/article',
          method: 'GET',
        }),
        providesTags: ['ArticleTracks'],
      }),
      fetchVitalArticles: builder.query<VitalContentResponse, void>({
        query: () => ({
          url: 'user/vitals/article',
          method: 'GET',
        }),
        providesTags: ['VitalArticles'],
      }),
      fetchFavoriteArticles: builder.query<FavoriteContentResponse, void>({
        query: () => ({
          url: 'user/articles/favourite',
          method: 'GET',
        }),
        providesTags: ['FavoriteArticles'],
      }),

      fetchRecipeTracks: builder.query<TracksResponse, void>({
        query: () => ({
          url: 'user/tracks/recipe',
          method: 'GET',
        }),
        providesTags: ['RecipeTracks'],
      }),
      fetchFavoriteRecipes: builder.query<FavoriteContentResponse, void>({
        query: () => ({
          url: 'user/recipes/favourite',
          method: 'GET',
        }),
        providesTags: ['FavoriteRecipes'],
      }),

      fetchNewContentTracksIds: builder.query<NewContentIdsResponse, void>({
        query: () => ({
          url: 'user/tracks/new',
          method: 'GET',
        }),
        providesTags: ['NewContentIds'],
      }),
      checkNewVitalContent: builder.query<CheckNewVitalContentResponse, void>({
        query: () => ({
          url: 'user/vitals/new',
          method: 'GET',
        }),
        providesTags: ['HasNewVitalContent'],
      }),

      fetchFoodVideos: builder.query<ListQueryResponse<Video>, ListQueryParameters>({
        query: params => ({
          url: 'food/videos',
          method: 'GET',
          params,
        }),
        providesTags: ['FoodVideos'],
      }),

      fetchFoodRecipes: builder.query<ListQueryResponse<Article>, ListQueryParameters>({
        query: params => ({
          url: 'food/recipes',
          method: 'GET',
          params,
        }),
        providesTags: ['FoodRecipes'],
      }),
    }),
    overrideExisting: __DEV__,
  });
