import { Linking } from 'react-native';
import { Box, Column, ScrollView, Row, Button } from 'native-base';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { Content, Logo } from '@app/components';

import {
  MyHealthRecordImage,
  MyLifestyleTrackerImage,
  ContentGalleryImage,
  FoodIsMedicineImage,
  MyWellnessJourneyImage,
} from '@assets/images';
import { useCommonTranslate } from '@app/hooks';

import { useTranslate } from '../hooks';
import { HomeCard, Header, Banner } from '../components';
import { FavoriteIcon } from '../components/icons';

function Home() {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const isConnected = useIsConnected();

  const navigate = useNavigate();

  function navigateTo(link: string) {
    navigate(link);
  }

  function navigateFavorite() {
    Linking.openURL('https://vitalopwellness.com/favorite-things/');
  }

  return (
    <Box flex={1}>
      <Header />

      <Banner />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Content mt={3} flex={1}>
          <HomeCard
            title={globalT('titles.my_wellness_journey')}
            image={MyWellnessJourneyImage}
            onPress={() => navigateTo('/private/my-wellness-journey')}
            disabled={!isConnected}
          />

          <Row mt={3.5} space={3.5}>
            <Column flex={1}>
              <HomeCard
                title={globalT('titles.my_health_record')}
                image={MyHealthRecordImage}
                onPress={() =>
                  navigateTo(`/private/health-record/${isConnected ? 'medications' : 'vitals'}`)
                }
              />
            </Column>

            <Column flex={1}>
              <HomeCard
                title={globalT('titles.food_is_medicine')}
                image={FoodIsMedicineImage}
                onPress={() => navigateTo('/private/food')}
                disabled={!isConnected}
              />
            </Column>
          </Row>

          <Row mt={3.5} space={3.5}>
            <Column flex={1}>
              <HomeCard
                title={globalT('titles.my_lifestyle_tracker')}
                image={MyLifestyleTrackerImage}
                onPress={() => navigateTo('/private/lifestyle-tracker')}
              />
            </Column>

            <Column flex={1}>
              <HomeCard
                title={globalT('titles.content_gallery')}
                image={ContentGalleryImage}
                onPress={() => navigateTo('/private/content-gallery')}
                disabled={!isConnected}
              />
            </Column>
          </Row>

          <Button
            mt={6}
            onPress={navigateFavorite}
            alignSelf={'center'}
            startIcon={<FavoriteIcon />}
          >
            {t('buttons.our_favorite_things')}
          </Button>
        </Content>

        <Logo />
      </ScrollView>
    </Box>
  );
}

export default Home;
