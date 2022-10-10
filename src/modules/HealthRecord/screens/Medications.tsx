import { useState } from 'react';
import { Box, Row, Spinner, ScrollView } from 'native-base';

import { Content, H1, AddButton, Logo } from '@app/components';
import { useFetchCurrencyQuery } from '@app/hooks';

import { ActiveMedication, InactiveMedication, Reminder } from '../components';
import { MedicationEditor } from '../components/form';
import { useTranslate, useFetchUserMedicationsQuery } from '../hooks';
import { Medication as TMedication } from '../types';

function Medications() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const [medication, setMedication] = useState<TMedication | null>(null);

  const { data: currencies } = useFetchCurrencyQuery();

  const { data: medicationsData, isLoading: isActiveMedicationsLoading } =
    useFetchUserMedicationsQuery('active');

  const { data: medicationsInactiveData, isLoading: isInactiveMedicationsLoading } =
    useFetchUserMedicationsQuery('inactive');

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setMedication(null);
  }

  function edit(item: TMedication) {
    openModal();
    setMedication(item);
  }

  return (
    <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
      <Content mt={5} flexGrow={1} justifyContent={'space-between'}>
        <Box>
          {/* TODO: Uncomment and implement when the reminder is ready. Now only the UI part is ready.
          <Box bgColor="white" rounded={4}>
            <Reminder />
          </Box> */}

          <Row mb={2.5} justifyContent="space-between">
            <H1>{t('titles.current_medications')}</H1>

            <AddButton onPress={openModal} />
          </Row>

          {isActiveMedicationsLoading && <Spinner size="lg" color="white" mb={4} />}

          {medicationsData?.map(item => (
            <ActiveMedication
              key={item.id}
              medication={item}
              onEdit={() => edit(item)}
              currencies={currencies}
            />
          ))}

          <H1 mt={5}>{t('titles.inactive_medications')}</H1>

          {isInactiveMedicationsLoading && <Spinner size="lg" color="white" mb={4} />}

          {medicationsInactiveData?.map(item => (
            <InactiveMedication key={item.id} medication={item} onEdit={() => edit(item)} />
          ))}

          {isModalOpen ? (
            <MedicationEditor
              onClose={closeModal}
              medication={medication}
              currencies={currencies}
            />
          ) : null}
        </Box>

        <Logo />
      </Content>
    </ScrollView>
  );
}

export default Medications;
