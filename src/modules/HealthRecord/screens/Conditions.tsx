import { useState } from 'react';
import { Row, Spinner, FlatList, Box } from 'native-base';

import { Content, H1, AddButton } from '@app/components';
import { useInfiniteScroll } from '@app/hooks';

import { Condition } from '../components';
import { AddCondition } from '../components/form';
import {
  useTranslate,
  useFetchUserCurrentConditionsQuery,
  useFetchUserResolvedConditionsQuery,
} from '../hooks';
import { Condition as TCondition } from '../state';

function Conditions() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const { data: currentConditions, isFetching } = useFetchUserCurrentConditionsQuery();

  const {
    data: resolvedConditions,
    loadMore,
    isFetching: isFetchingResolved,
  } = useInfiniteScroll(useFetchUserResolvedConditionsQuery, {
    take: 50,
  });

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function renderItem({ item }: { item: TCondition }) {
    return (
      <Condition
        key={item.id}
        name={item.name}
        conditionId={item.id}
        status={item.status}
        info={item.info}
        conditionResolvedDate={item.conditionResolvedDate}
      />
    );
  }

  return (
    <FlatList
      data={[{ key: 'conditions' }]}
      keyExtractor={item => item.key}
      renderItem={({ item }) => (
        <Content my={5} key={item.key}>
          <Row justifyContent="space-between" mb={2.5}>
            <H1>{t('titles.my_current_conditions')}</H1>

            <AddButton onPress={openModal} />
          </Row>

          <FlatList
            listKey="current"
            data={currentConditions}
            ItemSeparatorComponent={() => <Box h="10px" />}
            renderItem={renderItem}
            ListFooterComponent={isFetching ? <Spinner mt={4} size="lg" color="white" /> : null}
          />

          <Row justifyContent="space-between" mb={2.5}>
            <H1 mt={5} mb={2.5}>
              {t('titles.resolved_conditions')}
            </H1>
          </Row>

          <FlatList
            listKey="resolved"
            data={resolvedConditions}
            ItemSeparatorComponent={() => <Box h="10px" />}
            renderItem={renderItem}
            ListFooterComponent={
              isFetchingResolved ? <Spinner mt={4} size="lg" color="white" /> : null
            }
            onEndReached={loadMore}
          />

          {isModalOpen ? <AddCondition onClose={closeModal} /> : null}
        </Content>
      )}
    />
  );
}

export default Conditions;
