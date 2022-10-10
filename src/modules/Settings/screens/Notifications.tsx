import { useEffect, useMemo } from 'react';
import { Box, Row, Switch, Text, Pressable, ScrollView } from 'native-base';

import { Header, Content, BackArrow, H1, Logo } from '@app/components';
import { HintIcon } from '@app/components/icons';
import {
  useAppDispatch,
  useAppSelector,
  useSaveNotificationSettingsMutation,
  useNotificationPermissionCheck,
} from '@app/hooks';
import { isLastItem, isFirstItem } from '@app/utils';
import { KeyValuePayload } from '@app/types';

import { useWaterNotifications } from '@features/Notifications';

import { useTranslate } from '../hooks';
import { selectNotifications, selectReminders, actions, Reminders } from '../state';
import { Settings } from '../utils';

const { toggleNotification, toggleReminder, disableAllNotifications, enableAllNotifications } =
  actions;

type Setting = KeyValuePayload<{ title: string; hint: string }, string, boolean>;
type ReminderSetting = KeyValuePayload<{ title: string; hint: string }, keyof Reminders, boolean>;

function Notifications() {
  const t = useTranslate();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector(selectNotifications);
  const reminders = useAppSelector(selectReminders);

  const checkNotificationPermissions = useNotificationPermissionCheck();

  const { enable: enableWaterNotification, disable: disableWaterNotification } =
    useWaterNotifications();

  const [save] = useSaveNotificationSettingsMutation();

  const allNotificationEnabled = useMemo(() => {
    return Object.values(notifications).every(enabled => enabled);
  }, [notifications]);

  const notificationSettings: Setting[] = useMemo(
    () => [
      {
        key: 'myWellnessJourneytasksEnable',
        value: notifications.myWellnessJourneytasksEnable,
        payload: { title: t('notifications.MWJTasks'), hint: t('hints.MWJTasks') },
      },
      {
        key: 'newsAndUpdatesEnable',
        value: notifications.newsAndUpdatesEnable,
        payload: { title: t('notifications.news'), hint: t('hints.news') },
      },
    ],
    [t, notifications],
  );

  const reminderSettings: ReminderSetting[] = useMemo(
    () => [
      // Developer Note: The code below has been commented out due to MVP requirements
      // https://jira.scnsoft.com/browse/VIOM-1693
      // {
      //   key: 'medicationRemindersEnable',
      //   value: reminders.medicationRemindersEnable,
      //   payload: { title: t('reminders.medications'), hint: t('hints.medications') },
      // },
      {
        key: 'doctorAppointmentsEnable',
        value: reminders.doctorAppointmentsEnable,
        payload: { title: t('reminders.doctorAppointments'), hint: t('hints.doctorAppointments') },
      },
      {
        key: 'screeningTestsEnable',
        value: reminders.screeningTestsEnable,
        payload: { title: t('reminders.screeningTests'), hint: t('hints.screeningTests') },
      },
      {
        key: 'eyeExamEnable',
        value: reminders.eyeExamEnable,
        payload: { title: t('reminders.eyeExam'), hint: t('hints.eyeExam') },
      },
      {
        key: 'scheduleAnAppointmentEnable',
        value: reminders.scheduleAnAppointmentEnable,
        payload: {
          title: t('reminders.scheduleAppointments'),
          hint: t('hints.scheduleAppointments'),
        },
      },
      // Developer Note: The code below has been commented out due to MVP requirements
      // https://jira.scnsoft.com/browse/VIOM-1693
      // {
      //   key: 'vitalsCheckEnable',
      //   value: reminders.vitalsCheckEnable,
      //   payload: { title: t('reminders.vitalChecks'), hint: t('hints.vitalChecks') },
      // },
      {
        key: 'waterIntakeEnable',
        value: reminders.waterIntakeEnable,
        payload: { title: t('reminders.water'), hint: t('hints.water') },
      },
    ],
    [t, reminders],
  );

  function changeNotification(key: string, value: boolean) {
    if (!value) {
      checkNotificationPermissions();
    }

    dispatch(toggleNotification(key));
  }

  function changeReminder(key: keyof Reminders, value: boolean) {
    if (!value) {
      checkNotificationPermissions();
    }

    dispatch(toggleReminder(key));

    if (key === 'waterIntakeEnable') {
      changeWaterReminder();
    }
  }

  function changeWaterReminder() {
    if (reminders.waterIntakeEnable) {
      disableWaterNotification();
    } else {
      enableWaterNotification();
    }
  }

  function toggleNotifications(shouldEnable: boolean) {
    if (shouldEnable) {
      checkNotificationPermissions();
    }
    dispatch(shouldEnable ? enableAllNotifications() : disableAllNotifications());
  }

  useEffect(() => {
    const settings = Settings.toApiData({ notifications, reminders });

    save(settings);
  }, [notifications, reminders, save]);

  useEffect(() => {
    checkNotificationPermissions();
  }, []);

  return (
    <Box flex={1}>
      <Header title={t('titles.notifications_reminders')} leftElement={<BackArrow />} />

      <ScrollView>
        <Content mt="30px">
          <Box mb={4}>
            <H1 mb={4}>{t('titles.notifications')}</H1>

            <Box rounded={4} bgColor="white">
              <Box pl={4}>
                <Row py={3} pr={2.5} justifyContent="space-between">
                  <Row alignItems="center">
                    <Text>Push Notifications</Text>

                    <Pressable ml={1}>
                      <HintIcon>{t('hints.push_notifications')}</HintIcon>
                    </Pressable>
                  </Row>

                  <Switch isChecked={allNotificationEnabled} onValueChange={toggleNotifications} />
                </Row>

                {notificationSettings.map(notification => (
                  <Row
                    key={notification.key}
                    py={3}
                    pr={2.5}
                    ml={2.5}
                    justifyContent="space-between"
                    alignItems="center"
                    borderTopWidth={isFirstItem(notificationSettings, notification) ? 1 : 0}
                    borderBottomWidth={isLastItem(notificationSettings, notification) ? 0 : 1}
                    borderColor="#e9e9e9"
                    flex={1}
                  >
                    <Row flex={1}>
                      <Text>{notification.payload.title}</Text>

                      <Pressable my={1} ml={1}>
                        <HintIcon>{notification.payload.hint}</HintIcon>
                      </Pressable>
                    </Row>

                    <Switch
                      ml={2}
                      isChecked={notification.value}
                      onChange={() => changeNotification(notification.key, notification.value)}
                    />
                  </Row>
                ))}
              </Box>
            </Box>
          </Box>

          <Box mb={4}>
            <H1 mb={4}>{t('titles.reminders')}</H1>

            <Box rounded={4} bgColor="white">
              {reminderSettings.map(reminder => (
                <Row
                  key={reminder.key}
                  py={3}
                  pl={4}
                  pr={2.5}
                  justifyContent="space-between"
                  borderBottomWidth={isLastItem(reminderSettings, reminder) ? 0 : 1}
                  borderBottomColor="#e9e9e9"
                >
                  <Row alignItems="center">
                    <Text>{reminder.payload.title}</Text>

                    <Pressable ml={1}>
                      <HintIcon>{reminder.payload.hint}</HintIcon>
                    </Pressable>
                  </Row>

                  <Switch
                    isChecked={reminder.value}
                    onChange={() => changeReminder(reminder.key, reminder.value)}
                  />
                </Row>
              ))}
            </Box>
          </Box>

          <Logo />
        </Content>
      </ScrollView>
    </Box>
  );
}

export default Notifications;
