import { useMemo } from 'react';
import { Box, VStack, Button, ScrollView } from 'native-base';
import { useTranslation } from 'react-i18next';

import {
  Header,
  Content,
  BurgerIconButton,
  Logo,
  NotificationIconButton,
  AppLink,
} from '@app/components';
import { useLogout } from '@app/hooks';
import { showLogoutAlert } from '@app/utils';

import { NavLink } from '../components';
import { useTranslate } from '../hooks';

function Settings() {
  const t = useTranslate();
  const { t: globalT } = useTranslation();
  const logout = useLogout();

  const links = useMemo(
    () => [
      { title: t('titles.account'), path: 'account-details' },
      { title: t('titles.language_units'), path: 'localization' },
      { title: t('titles.notifications_reminders'), path: 'notifications' },
      { title: t('titles.subscription_plan'), path: 'subscription-management' },
      { title: t('titles.security'), path: 'security' },
      { title: t('titles.help'), path: 'help' },
    ],
    [t],
  );

  function openConfirmAlert() {
    showLogoutAlert({
      onConfirm: logout,
    });
  }

  return (
    <Box flex={1}>
      <Header
        title={t('titles.settings')}
        leftElement={<BurgerIconButton />}
        rightElement={<NotificationIconButton />}
      />

      <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
        <Content mt={5} flex={1}>
          <VStack space={2.5}>
            {links.map(link => (
              <NavLink key={link.title} to={link.path}>
                {link.title}
              </NavLink>
            ))}
          </VStack>
          <Button onPress={openConfirmAlert} my={5}>
            {globalT('logout')}
          </Button>
        </Content>

        <Box>
          <Box alignItems="center">
            <AppLink to="/private/settings/licenses">
              {globalT('titles.open_source_software_used')}
            </AppLink>
          </Box>

          <Logo />
        </Box>
      </ScrollView>
    </Box>
  );
}

export default Settings;
