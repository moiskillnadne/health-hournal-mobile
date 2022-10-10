import { useState } from 'react';
import { Row, Spinner, Pressable, Text, Box, ScrollView } from 'native-base';

import { Content, Logo, AddButton, H1 } from '@app/components';
import { PencilIcon } from '@app/components/icons';
import { useAppSelector } from '@app/hooks';

import { useTranslate, useFetchAdditionalInfoQuery } from '../hooks';
import { AdditionalInfoEditor } from '../components/form';
import { selectAdditionalInfo } from '../state';

function AdditionalInfo() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const { value } = useAppSelector(selectAdditionalInfo);
  const { isLoading } = useFetchAdditionalInfoQuery();

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
      <Content mt={5} flexGrow={1} justifyContent={'space-between'}>
        <Box>
          <Row justifyContent="space-between">
            <H1>{t('titles.addition_info')}</H1>

            {!value ? <AddButton onPress={openModal} /> : null}
          </Row>

          {isLoading && <Spinner size="lg" color="white" mb={4} />}

          {value ? (
            <Row
              bgColor="white"
              rounded={4}
              mt={5}
              py={2.5}
              px={3.5}
              mb={2.5}
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Text maxWidth={'90%'}>{value}</Text>

              <Pressable onPress={openModal}>
                <PencilIcon fill="#DEE0E6" />
              </Pressable>
            </Row>
          ) : null}

          {isModalOpen ? <AdditionalInfoEditor onClose={closeModal} /> : null}
        </Box>
        <Logo />
      </Content>
    </ScrollView>
  );
}

export default AdditionalInfo;
