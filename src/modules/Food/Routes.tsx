import { Route, Routes } from 'react-router-native';

import { ListViewProvider } from '@features/Lists';

import { Food, FoodList, FoodVideos, Recipes, Video, Recipe } from './screens';

export default function () {
  return (
    <ListViewProvider>
      <Routes>
        <Route index element={<Food />} />

        <Route path="food-list" element={<FoodList />} />

        <Route path="food-videos" element={<FoodVideos />} />
        <Route path="food-videos/:id" element={<Video />} />

        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<Recipe />} />
      </Routes>
    </ListViewProvider>
  );
}
