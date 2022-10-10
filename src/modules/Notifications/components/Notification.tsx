import { useState, useEffect, useCallback } from 'react';
import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import { Box, Text, Row, Pressable, Image, Column } from 'native-base';

import { ErrorAlert } from '@app/components';
import { DeleteIcon, CollapseIcon, DropdownArrowIcon } from '@app/components/icons';
import { FirebaseNotification } from '@app/features/Notifications/types';
import { NOTIFICATION_ACTIONS } from '@app/features/Notifications/constants';
import { ValueOf } from '@app/types';

import ActionButtonsGroup from './ActionButtonsGroup';
import { useTranslate, useRemoveNotificationMutation } from '../hooks';

type Props = {
  notification: FirebaseNotification;
  onNotificationHandled: (action: ValueOf<typeof NOTIFICATION_ACTIONS>) => void;
};

function Notification({ notification, onNotificationHandled }: Props) {
  const t = useTranslate();

  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<number | undefined>(undefined);

  const {
    data: { isViewed, id },
    ios: { attachments },
  } = notification;

  const hasImage = attachments?.some(item => item.url);

  const [removeNotification, { error }] = useRemoveNotificationMutation();

  function remove() {
    if (id) {
      removeNotification(id);
    }
  }

  function toggleTextShown() {
    setTextShown(!textShown);
  }

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [textShown],
  );

  function getImageUrl() {
    return attachments.find(item => item.url)?.url;
  }

  function renderShowMore() {
    if (showMoreButton) {
      return (
        <Pressable onPress={toggleTextShown} alignSelf="center" mt={2.5}>
          {!textShown ? <DropdownArrowIcon fill={'#DEE0E6'} /> : <CollapseIcon fill={'#DEE0E6'} />}
        </Pressable>
      );
    }
  }

  return (
    <Box bgColor="white" borderRadius={4}>
      {hasImage && (
        <Image
          w="full"
          h={'200px'}
          borderTopRadius={4}
          source={{
            uri: getImageUrl(),
          }}
          alt={notification.title}
          resizeMode="cover"
        />
      )}

      <Box py={2.5} px={3.5}>
        <Row justifyContent="space-between">
          <Column flex={1}>
            <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={{ lineHeight: 21 }}>
              {isViewed === 'false' ? (
                <Box>
                  <Box bgColor="#f23836" px={1} borderRadius={4} mr={1.5}>
                    <Text color="white" fontSize={12} fontWeight={600}>
                      {t('labels.new').toUpperCase()}
                    </Text>
                  </Box>
                </Box>
              ) : null}

              {notification.body}
            </Text>

            <Row space={2.5}>
              <ActionButtonsGroup
                notification={notification}
                onNotificationHandled={onNotificationHandled}
              />
            </Row>
          </Column>

          <Column justifyContent="space-between">
            <Pressable onPress={remove} hitSlop={9}>
              <DeleteIcon fill="#DEE0E6" />
            </Pressable>

            {renderShowMore()}
          </Column>
        </Row>
      </Box>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </Box>
  );
}

export default Notification;
