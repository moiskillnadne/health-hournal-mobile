import { useState, useMemo, PropsWithChildren, memo } from 'react';
import { Row, Column, PresenceTransition, Text, Pressable, Box, ScrollView } from 'native-base';
import { useNavigate } from 'react-router-native';
import { useIsConnected } from 'react-native-offline';

import { AppAccordion } from '@app/components';
import { SettingsIcon, LogoutIcon } from '@app/components/icons';
import { DrawerNavigationContext } from '@app/contexts';
import { useCommonTranslate, useLogout } from '@app/hooks';
import { showLogoutAlert, noop } from '@app/utils';

type Props = PropsWithChildren<unknown>;

const DURATION = 250;

function Drawer({ children }: Props) {
  const t = useCommonTranslate();
  const navigate = useNavigate();
  const logout = useLogout();

  const [isOpen, setIsOpen] = useState(false);

  const isConnected = useIsConnected();

  const value = useMemo(
    () => ({
      open: () => setIsOpen(true),
    }),
    [],
  );

  function close() {
    setIsOpen(false);
  }

  function closeIfOpen() {
    if (isOpen) close();
  }

  function tryToLogout() {
    showLogoutAlert({
      onConfirm: () => {
        close();

        setTimeout(logout, DURATION * 2);
      },
    });
  }

  function navigateSettings() {
    closeIfOpen();
    navigate('/private/settings');
  }

  return (
    <DrawerNavigationContext.Provider value={value}>
      <Box flex={1}>{children}</Box>

      {isOpen && <Pressable position="absolute" w="full" h="full" onPress={close} />}

      <PresenceTransition
        visible={isOpen}
        initial={{
          translateX: -270,
        }}
        animate={{
          translateX: 0,
          transition: {
            duration: DURATION,
          },
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          flex: 1,
          height: '100%',
        }}
      >
        <Column
          safeAreaTop
          safeAreaLeft
          safeAreaBottom
          w="270px"
          h="full"
          bg={{
            linearGradient: {
              colors: ['#8452b0', '#3b2272'],
              start: [0, 1],
              end: [1, 0],
            },
          }}
          _android={{
            pt: 4,
            pb: 4,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              paddingBottom: 20,
            }}
          >
            <AppAccordion onClose={closeIfOpen} />

            <Column pl={6} space={6} pb={isConnected ? 0 : 16} mt={3.5}>
              <Pressable onPress={isConnected ? navigateSettings : noop}>
                <Row opacity={isConnected ? 1 : 0.5}>
                  <SettingsIcon />

                  <Text ml={2.5} color="white">
                    {t('titles.settings')}
                  </Text>
                </Row>
              </Pressable>

              <Pressable onPress={tryToLogout}>
                <Row>
                  <LogoutIcon />

                  <Text ml={2.5} color="white">
                    {t('logout')}
                  </Text>
                </Row>
              </Pressable>
            </Column>
          </ScrollView>
        </Column>
      </PresenceTransition>
    </DrawerNavigationContext.Provider>
  );
}

export default memo(Drawer);
