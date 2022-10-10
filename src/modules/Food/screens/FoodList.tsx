import { Box, FlatList, Spinner } from 'native-base';

import { Header, BackArrow, Content } from '@app/components';
import { useInfiniteScroll } from '@app/hooks';

import { useTranslate, useFetchFoodPdfListQuery } from '../hooks';
import { PdfFoodCard } from '../components';
import { PdfItem } from '../types';

function FoodList() {
  const t = useTranslate();

  const { data, loadMore, isFetching } = useInfiniteScroll<PdfItem>(useFetchFoodPdfListQuery, {
    take: 50,
  });

  return (
    <Box flex={1}>
      <Header title={t('titles.what_do_i_eat')} leftElement={<BackArrow />} />

      <Content mt={2.5} mb={5} flex={1}>
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <Box h="20px" />}
          renderItem={({ item }) => (
            <PdfFoodCard title={item.title} imageSource={item.image} pdfSource={item.url} />
          )}
          ListFooterComponent={isFetching ? <Spinner mt={4} size="lg" color="white" /> : null}
          onEndReached={loadMore}
        />
      </Content>
    </Box>
  );
}

export default FoodList;
