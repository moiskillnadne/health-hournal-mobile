import { Route, Routes } from 'react-router-native';

import { ListViewProvider } from '@features/Lists';
import { ContentGallery, Articles, Article, Videos, Video } from './screens';

export default function () {
  return (
    <ListViewProvider>
      <Routes>
        <Route index element={<ContentGallery />} />

        <Route path="articles" element={<Articles />} />
        <Route path="articles/:id" element={<Article />} />

        <Route path="videos" element={<Videos />} />
        <Route path="videos/:id" element={<Video />} />
      </Routes>
    </ListViewProvider>
  );
}
