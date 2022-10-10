import { Alert } from 'react-native';

import { t } from 'i18next';

type AlertArgs = {
  message?: string;
  onConfirm: () => any;
  onDecline?: () => any;
};

export function showLogoutAlert({ onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('logout'),
    t('questions.want_to_logout'),
    [
      {
        text: t('yes'),
        onPress: onConfirm,
      },
      {
        text: t('no'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}

export function showConfirmCancellationWarning({ message, onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('warning'),
    message || t('warnings.changes_lost'),
    [
      {
        text: t('ok'),
        onPress: onConfirm,
      },
      {
        text: t('cancel'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}

export function showExitAlert({ onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('exit'),
    t('questions.want_to_exit'),
    [
      {
        text: t('yes'),
        onPress: onConfirm,
      },
      {
        text: t('no'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}

export function showEmailChangedWarning({ onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('warning'),
    t('warnings.email_changed'),
    [
      {
        text: t('ok'),
        onPress: onConfirm,
      },
      {
        text: t('cancel'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}

export function showDownloadSuccessAlert({ onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('warnings.success'),
    t('warnings.the_file_has_been_downloaded'),
    [
      {
        text: t('open'),
        onPress: onConfirm,
      },
      {
        text: t('close'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}

export function showSystemAlarmPermissionsAlert({ onConfirm, onDecline }: AlertArgs) {
  Alert.alert(
    t('warning'),
    t('warnings.please_turn_on_alarm_permissions'),
    [
      {
        text: t('ok'),
        onPress: onConfirm,
      },
      {
        text: t('cancel'),
        onPress: onDecline,
        style: 'cancel',
      },
    ],
    { cancelable: true },
  );
}
