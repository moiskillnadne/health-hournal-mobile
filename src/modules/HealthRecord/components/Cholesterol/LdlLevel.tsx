import { useState } from 'react';
import { Box } from 'native-base';

import { CHOLESTEROL_UNITS } from '@app/constants';
import { selectMeasurementUnit } from '@app/state';
import { useAppSelector } from '@app/hooks';

import { useFetchLastLdlQuery, useTranslate } from '../../hooks';
import { selectLDL } from '../../state';
import { CHOLESTEROL_UNITS_FORM } from '../../constants';
import { formatNumberValue } from '../../utils';

import { AddLdlLevel } from '../form';
import CardContent from '../CardContent';

function LdlLevel() {
  const t = useTranslate();

  const [isModalOpen, setModalOpen] = useState(false);

  const unit = useAppSelector(selectMeasurementUnit);

  const { cholesterol, goalCholesterol } = useAppSelector(selectLDL);

  const cholesterolUnit = CHOLESTEROL_UNITS_FORM[unit];
  const cholesterolUnitLabel = CHOLESTEROL_UNITS[unit];

  useFetchLastLdlQuery();

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
        title={t('titles.ldl')}
        date={cholesterol.datetime}
        value={formatNumberValue(value) || null}
        unit={cholesterolUnitLabel}
        goalValue={formatNumberValue(goalValue) || null}
        goalUnit={cholesterolUnitLabel}
        onAdd={openModal}
      />
      {isModalOpen ? <AddLdlLevel onClose={closeModal} goalValue={goalValue} /> : null}
    </Box>
  );
}

export default LdlLevel;
