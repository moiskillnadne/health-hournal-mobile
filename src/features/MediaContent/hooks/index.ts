import { api } from '../api';

export { default as useMarkAsViewed } from './useMarkAsViewed';

export const {
  useFetchArticlesQuery,
  useFetchVideosQuery,
  useFetchVideoQuery,
  useFetchArticleQuery,
  useFetchFoodVideosQuery,
  useUpdateArticleMutation,
  useUpdateRecipeMutation,
  useUpdateVideoMutation,
  useFetchArticleTracksQuery,
  useFetchFavoriteArticlesQuery,
  useFetchFavoriteRecipesQuery,
  useFetchFavoriteVideosQuery,
  useFetchRecipeTracksQuery,
  useFetchVideoTracksQuery,
  useFetchVitalArticlesQuery,
  useFetchVitalVideosQuery,
  useCheckNewVitalContentQuery,
  useFetchNewContentTracksIdsQuery,
  useFetchFoodRecipesQuery,
} = api;
