import { useState } from 'react';
import { Box } from 'native-base';

import { BLOOD_SUGAR_UNITS, MEASUREMENT_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { useAppSelector } from '@app/hooks';

import { useFetchLastAfterMealBloodSugarQuery, useTranslate } from '../../hooks';
import { BLOOD_SUGAR_UNITS_FORM } from '../../constants';
import { selectAfterMealBloodSugar } from '../../state';
import { formatNumberValue } from '../../utils';

import { AddAfterMealBloodSugar } from '../form';
import CardContent from '../CardContent';
// import Reminder from '../Reminder';

function AfterMealBloodSugar() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const unit = useAppSelector(selectMeasurementUnit);
  const { bloodSugar, goalBloodSugar } = useAppSelector(selectAfterMealBloodSugar);

  const bloodSugarUnit = BLOOD_SUGAR_UNITS_FORM[unit];
  const bloodSugarUnitLabel = BLOOD_SUGAR_UNITS[unit];

  useFetchLastAfterMealBloodSugarQuery();

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
          title={t('titles.after_meal_blood_sugar')}
          date={bloodSugar.datetime}
          value={formatNumberValue(value) || null}
          unit={bloodSugarUnitLabel}
          goalValue={formatNumberValue(goalValue) || null}
          goalUnit={bloodSugarUnitLabel}
          onAdd={openModal}
        />
        {isModalOpen ? <AddAfterMealBloodSugar onClose={closeModal} goalValue={goalValue} /> : null}
      </Box>
    </Box>
  );
}

export default AfterMealBloodSugar;
