import { Box, Column, ScrollView } from 'native-base';
import { useNavigate, useResolvedPath } from 'react-router-native';

import { Header, Content, BurgerIconButton, Logo, NotificationIconButton } from '@app/components';

import { FoodListImage, FoodVideosImage, RecipesImage } from '@assets/images';

import { useTranslate } from '../hooks';
import { FoodType } from '../components';

function Food() {
  const t = useTranslate();
  const navigate = useNavigate();

  const foodListPath = useResolvedPath('food-list');
  const foodVideosPath = useResolvedPath('food-videos');
  const recipesPath = useResolvedPath('recipes');

  function navigateFoodList() {
    navigate(foodListPath);
  }

  function navigateFoodVideos() {
    navigate(foodVideosPath);
  }

  function navigateRecipes() {
    navigate(recipesPath);
  }

  return (
    <Box flex={1}>
      <Header
        title={t('titles.food_is_medicine')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Content mt={5} flex={1}>
          <Column space={5}>
            <FoodType
              title={t('titles.what_do_i_eat')}
              image={FoodListImage}
              onPress={navigateFoodList}
            />

            <FoodType
              title={t('titles.all_things_food_videos')}
              image={FoodVideosImage}
              onPress={navigateFoodVideos}
            />

            <FoodType title={t('titles.recipes')} image={RecipesImage} onPress={navigateRecipes} />
          </Column>
        </Content>

        <Logo />
      </ScrollView>
    </Box>
  );
}

export default Food;
