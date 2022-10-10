import { Box, Column, ScrollView } from 'native-base';
import { useNavigate, useResolvedPath } from 'react-router-native';

import { Header, Content, BurgerIconButton, Logo, NotificationIconButton } from '@app/components';

import { VideosImage, ArticlesImage } from '@assets/images';

import { useTranslate } from '../hooks';
import { ContentGalleryType } from '../components';

function Settings() {
  const t = useTranslate();
  const navigate = useNavigate();

  const videosPath = useResolvedPath('videos');
  const articlesPath = useResolvedPath('articles');

  function navigateVideos() {
    navigate(videosPath);
  }

  function navigateArticles() {
    navigate(articlesPath);
  }

  return (
    <Box flex={1}>
      <Header
        title={t('titles.content_gallery')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Content mt={5} flex={1}>
          <Column space={5}>
            <ContentGalleryType
              title={t('titles.videos')}
              image={VideosImage}
              onPress={navigateVideos}
            />

            <ContentGalleryType
              title={t('titles.articles')}
              image={ArticlesImage}
              onPress={navigateArticles}
            />
          </Column>
        </Content>

        <Logo />
      </ScrollView>
    </Box>
  );
}

export default Settings;
