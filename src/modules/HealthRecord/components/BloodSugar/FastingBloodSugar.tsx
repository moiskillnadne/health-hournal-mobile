import { useState } from 'react';
import { Box } from 'native-base';

import { BLOOD_SUGAR_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { useAppSelector } from '@app/hooks';

import { useFetchLastFastingBloodSugarQuery, useTranslate } from '../../hooks';
import { BLOOD_SUGAR_UNITS_FORM } from '../../constants';
import { selectFastingBloodSugar } from '../../state';
import { formatNumberValue } from '../../utils';

import { AddFastingBloodSugar } from '../form';
import CardContent from '../CardContent';
// import Reminder from '../Reminder';

function FastingBloodSugar() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const unit = useAppSelector(selectMeasurementUnit);
  const { bloodSugar, goalBloodSugar } = useAppSelector(selectFastingBloodSugar);

  const bloodSugarUnit = BLOOD_SUGAR_UNITS_FORM[unit];
  const bloodSugarUnitLabel = BLOOD_SUGAR_UNITS[unit];

  useFetchLastFastingBloodSugarQuery();

  const value = bloodSugar[bloodSugarUnit];
  const goalValue = goalBloodSugar[bloodSugarUnit];

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Box>
      {/* TODO: Uncomment and implement when the reminder is ready. Now only the UI part is ready.
      <Box borderBottomWidth={1} borderTopWidth={1} borderColor="#e9e9e9">
        <Reminder />
      </Box> */}

      <Box p={1}>
        <CardContent
          title={t('titles.fasting_blood_sugar')}
          date={bloodSugar.datetime}
          value={formatNumberValue(value) || null}
          unit={bloodSugarUnitLabel}
          goalValue={formatNumberValue(goalValue) || null}
          goalUnit={bloodSugarUnitLabel}
          onAdd={openModal}
        />
        {isModalOpen ? <AddFastingBloodSugar onClose={closeModal} goalValue={goalValue} /> : null}
      </Box>
    </Box>
  );
}

export default FastingBloodSugar;
