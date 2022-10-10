import { useEffect } from 'react';
import { Text, Button, Column, Row, Switch } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useIsConnected } from 'react-native-offline';
import { useLocation, useNavigate } from 'react-router-native';

import { WaterNotification } from '@app/types';
import { AppModal } from '@app/components';
import { SelectField, InputMaskField } from '@app/components/form';
import { HintIcon } from '@app/components/icons';
import {
  useAppForm,
  useAppSelector,
  useCommonTranslate,
  useSaveNotificationSettingsMutation,
  useNotificationPermissionCheck,
  useSaveSettingsRemindersMutation,
} from '@app/hooks';
import { selectMeasurementUnit } from '@app/state';
import { WATER_UNITS, WATER_UNITS_LABELS, TimeInterval, TimePeriod } from '@app/constants';
import { isAndroid12orHigher } from '@app/utils';

import { useWaterNotifications, isAlarmPermissionsOn } from '@features/Notifications';

import { useTranslate, useAddWaterMutation } from '../../hooks';
import { AddWaterSchema } from '../../schemas';
import { AddWaterForm } from '../../types';
import { WATER_FREQUENCY_OPTIONS, TIME_PERIOD_OPTIONS } from '../../constants';
import { Water } from '../../utils';

type Props = {
  onClose: () => void;
  goalValue?: number;
};

const roundValue = (value: number | undefined) => (value ? Math.round(value) : undefined);

function AddWater({ onClose, goalValue }: Props) {
  const t = useTranslate();
  const globalT = useCommonTranslate();

  const isOnline = useIsConnected();
  const checkNotificationPermissions = useNotificationPermissionCheck();
  const location = useLocation();
  const navigate = useNavigate();

  const unit = useAppSelector(selectMeasurementUnit);
  const {
    notification: waterNotification,
    create: createWaterNotification,
    disable: disableWaterNotification,
  } = useWaterNotifications();

  const [saveNotificationSettings] = useSaveNotificationSettingsMutation();

  const [saveRemindersSettings] = useSaveSettingsRemindersMutation();

  const waterUnit = WATER_UNITS[unit];

  const waterUnitLabel = WATER_UNITS_LABELS[unit];

  const form = useAppForm<AddWaterForm>(
    {
      defaultValues: {
        water: {
          [waterUnit]: '',
        },
        ...(goalValue && { goalWater: { [waterUnit]: roundValue(goalValue)?.toString() } }),
        reminderEnabled: waterNotification.enabled,
        frequency: waterNotification?.notification?.frequency,
        from: waterNotification?.notification?.timeRange?.from?.toString(),
        to: waterNotification?.notification?.timeRange?.to?.toString(),
      } as AddWaterForm,
    },
    { schema: AddWaterSchema, context: { unit } },
  );

  const { handleSubmit, watch, setValue, clearErrors } = form;

  const [reminderEnabled] = watch(['reminderEnabled']);

  const [addWater, { isSuccess: isSuccessfullyAdded, isError, isLoading }] = useAddWaterMutation();

  function saveWaterNotification(notification: WaterNotification) {
    const settings = {
      waterInterval: TimeInterval[notification.frequency],
      waterPeriod: TimePeriod[notification.frequency],
      waterFrom: `${notification.timeRange.from}:00:00`,
      waterTo: `${notification.timeRange.to}:00:00`,
    };
    saveRemindersSettings(settings);
  }

  function add(data: AddWaterForm) {
    const payload = Water.toAddData(data);

    addWater(payload);
    handleNotifications(data);
  }

  function onAdd(data: AddWaterForm) {
    if (reminderEnabled && isAndroid12orHigher) {
      isAlarmPermissionsOn().then(hasPermissions => {
        if (hasPermissions) add(data);
      });
    } else {
      add(data);
    }
  }

  function handleNotifications(data: AddWaterForm) {
    if (data.reminderEnabled) {
      const { frequency, from, to } = data;

      const notification = {
        frequency,
        timeRange: {
          from: from ? +from : 0,
          to: to ? +to : 0,
        },
      } as WaterNotification;

      createWaterNotification(notification);
      saveWaterNotification(notification);
      saveNotificationSettings({ waterIntakeEnable: true });
    } else {
      disableWaterNotification();
      saveNotificationSettings({ waterIntakeEnable: false });
    }
  }

  function changeReminder() {
    if (!reminderEnabled) {
      checkNotificationPermissions();
    }
    setValue('reminderEnabled', !reminderEnabled);
    clearErrors();
  }

  useEffect(() => {
    if (!isOnline && isError) {
      onClose();
    }
  }, [isOnline, isError, onClose]);

  useEffect(() => {
    if (isSuccessfullyAdded) {
      onClose();
    }
  }, [isSuccessfullyAdded, onClose]);

  useEffect(() => {
    navigate(location.pathname, {});
  }, [location.pathname, navigate]);

  return (
    <>
      <AppModal isOpen onClose={onClose} px={4} avoidKeyboard>
        <AppModal.Content bg="white" borderRadius={4} maxW="full" w="full" maxH="full">
          <AppModal.CloseButton top={3.5} />

          <AppModal.Header borderBottomWidth={0} bgColor="white">
            <Text fontSize={18} fontWeight={600}>
              {t('titles.add_water')}
            </Text>
          </AppModal.Header>

          <AppModal.Body>
            <FormProvider {...form}>
              <Column space={2.5}>
                <InputMaskField
                  label={`${t('titles.water')}, ${waterUnitLabel}*`}
                  keyboardType="numeric"
                  name={`water.${waterUnit}`}
                  options={{
                    mask: unit === 'USA' ? '999' : '9999',
                  }}
                />

                <InputMaskField
                  label={`${globalT('goal')}, ${waterUnitLabel}`}
                  keyboardType="numeric"
                  name={`goalWater.${waterUnit}`}
                  options={{
                    mask: unit === 'USA' ? '999' : '9999',
                  }}
                />

                <Row mt={3.5} justifyContent="space-between">
                  <Text>{t('form.water_reminder')}</Text>

                  <Switch isChecked={reminderEnabled} onValueChange={changeReminder} />
                </Row>

                <Text fontWeight={600} mr={1}>
                  {globalT('frequency')}
                </Text>

                <SelectField
                  flex={1}
                  label={globalT('frequency')}
                  name="frequency"
                  options={WATER_FREQUENCY_OPTIONS}
                  isDisabled={!reminderEnabled}
                />

                <Row alignItems="center">
                  <Text fontWeight={600} mr={1}>
                    {t('form.time_period')}
                  </Text>

                  <HintIcon>{t('tooltip.time_period')}</HintIcon>
                </Row>

                <Row space={2.5}>
                  <SelectField
                    flex={1}
                    label={t('form.from')}
                    name="from"
                    options={TIME_PERIOD_OPTIONS}
                    isDisabled={!reminderEnabled}
                  />

                  <SelectField
                    flex={1}
                    label={t('form.to')}
                    name="to"
                    options={TIME_PERIOD_OPTIONS}
                    isDisabled={!reminderEnabled}
                  />
                </Row>

                <Button mt={2.5} onPress={handleSubmit(onAdd)} isDisabled={isLoading}>
                  {globalT('add')}
                </Button>
              </Column>
            </FormProvider>
          </AppModal.Body>
        </AppModal.Content>
      </AppModal>
    </>
  );
}

export default AddWater;
