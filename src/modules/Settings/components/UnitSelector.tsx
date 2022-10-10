import { useMemo } from 'react';
import { StyledProps } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectMeasurementUnit, changeMeasurementUnit } from '@app/state';
import { MeasurementUnit, KeyValue } from '@app/types';

import { Select } from '@app/components';

function UnitSelector(props: StyledProps) {
  const unit = useAppSelector(selectMeasurementUnit);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function changeUnit(unit: string) {
    dispatch(changeMeasurementUnit(unit as MeasurementUnit));
  }

  const options: KeyValue[] = useMemo(
    () => [
      { key: t('USA'), value: 'USA' },
      { key: t('metric'), value: 'Metric' },
    ],
    [t],
  );

  return (
    <Select
      value={unit}
      options={options}
      onChange={changeUnit}
      placeholder="Select language"
      {...props}
    />
  );
}

export default UnitSelector;
