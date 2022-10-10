import { useState } from 'react';
import { Box } from 'native-base';

import { CHOLESTEROL_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { useAppSelector } from '@app/hooks';

import { useFetchLastTriglycerideQuery, useTranslate } from '../../hooks';
import { formatNumberValue } from '../../utils';
import { selectTriglycerides } from '../../state';
import { CHOLESTEROL_UNITS_FORM } from '../../constants';

import { AddTriglyceride } from '../form';
import CardContent from '../CardContent';

function Triglyceride() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const unit = useAppSelector(selectMeasurementUnit);
  const { cholesterol, goalCholesterol } = useAppSelector(selectTriglycerides);

  const cholesterolUnit = CHOLESTEROL_UNITS_FORM[unit];
  const cholesterolUnitLabel = CHOLESTEROL_UNITS[unit];

  useFetchLastTriglycerideQuery();

  const value = cholesterol[cholesterolUnit];
  const goalValue = goalCholesterol[cholesterolUnit];

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <Box p={1}>
      <CardContent
        title={t('titles.triglycerides')}
        date={cholesterol.datetime}
        value={formatNumberValue(value) || null}
        unit={cholesterolUnitLabel}
        goalValue={formatNumberValue(goalValue) || null}
        goalUnit={cholesterolUnitLabel}
        onAdd={openModal}
      />
      {isModalOpen ? <AddTriglyceride onClose={closeModal} goalValue={goalValue} /> : null}
    </Box>
  );
}

export default Triglyceride;
