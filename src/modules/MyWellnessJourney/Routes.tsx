import { Route, Routes, Navigate } from 'react-router-native';

import { ListViewProvider } from '@features/Lists';

import { MyWellnessJourney, Videos, Articles, Recipes, Video, Article, Recipe } from './screens';

export default function () {
  return (
    <ListViewProvider>
      <Routes>
        <Route index element={<Navigate to="videos" replace />} />

        <Route element={<MyWellnessJourney />}>
          <Route path="videos" element={<Videos />} />

          <Route path="articles" element={<Articles />} />

          <Route path="recipes" element={<Recipes />} />
        </Route>

        <Route path="videos/:id" element={<Video />} />
        <Route path="articles/:id" element={<Article />} />
        <Route path="recipes/:id" element={<Recipe />} />
      </Routes>
    </ListViewProvider>
  );
}
