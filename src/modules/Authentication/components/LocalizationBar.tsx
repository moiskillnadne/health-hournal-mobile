import { HStack, Select } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { selectMeasurementUnit, changeMeasurementUnit } from '@app/state';
import { MeasurementUnit, KeyValue } from '@app/types';

import { DropdownArrowIcon } from '../components/icons';

const Languages: KeyValue[] = [
  { key: 'ENG', value: 'en' },
  { key: 'ES', value: 'es' },
];

const Units: KeyValue[] = [
  { key: 'USA', value: 'USA' },
  { key: 'Metric', value: 'Metric' },
];

const LocalizationBar = () => {
  const unit = useAppSelector(selectMeasurementUnit);

  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  function changeUnit(unit: string) {
    dispatch(changeMeasurementUnit(unit as MeasurementUnit));
  }

  return (
    <HStack justifyContent="flex-start" my="3">
      <Select
        minWidth="86px"
        p={1}
        defaultValue="USA"
        bgColor="white"
        selectedValue={unit}
        onValueChange={changeUnit}
        dropdownIcon={<DropdownArrowIcon />}
      >
        {Units.map(unit => (
          <Select.Item key={unit.key} label={unit.key} value={unit.value} />
        ))}
      </Select>

      {/* <Select
        minWidth="86px"
        p={1}
        bgColor="white"
        accessibilityLabel="Select language"
        placeholder="Select language"
        selectedValue={i18n.resolvedLanguage}
        onValueChange={changeLanguage}
        dropdownIcon={<DropdownArrowIcon />}
      >
        {Languages.map(language => (
          <Select.Item key={language.key} label={language.key} value={language.value} />
        ))}
      </Select> */}
    </HStack>
  );
};
export default LocalizationBar;
