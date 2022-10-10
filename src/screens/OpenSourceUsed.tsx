import { useState } from 'react';
import { Box, Row, Button, ScrollView, Link, Text } from 'native-base';

import {
  Header,
  Content,
  BackArrow,
  Logo,
  NotificationIconButton,
  InfoModal,
} from '@app/components';
import { useLocation } from 'react-router-native';

import { useCommonTranslate } from '../hooks';
import licenseData from '../licenses.json';

type LicenseItem = {
  license: string;
  name: string;
  href: string;
  description: string;
};

type LicensesData = {
  [key: string]: LicenseItem[];
};

function OpenSourceUsed() {
  const globalT = useCommonTranslate();

  const { pathname } = useLocation();

  const isPrivateScreen = pathname.includes('private');

  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Maybe<LicenseItem>>(null);

  const licenses: LicensesData = licenseData;

  const licensesKeys = Object.keys(licenses);

  const openModal = (item: LicenseItem) => {
    setModalOpen(true);
    setSelected(item);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Box flex={1}>
        <Header
          title={globalT('titles.open_source_software_used')}
          leftElement={<BackArrow />}
          rightElement={isPrivateScreen ? <NotificationIconButton /> : undefined}
        />

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <Content flex={1} mt={5}>
            <Box>
              {licensesKeys.map(key => {
                const title = licenses[key][0].license;

                return (
                  <Box key={title}>
                    {licenses[key].map(item => (
                      <>
                        <Text color="white" fontWeight={700}>
                          {item.name}
                        </Text>

                        <Row space={5} alignItems="center" key={item.href} mb={4}>
                          <Button
                            variant="unstyled"
                            bgColor="transparent"
                            p={0}
                            py={2}
                            _text={{
                              color: 'white',
                              textDecorationLine: 'underline',
                            }}
                            onPress={() => openModal(item)}
                          >
                            {globalT('actions.show_license')}
                          </Button>

                          <Link
                            _text={{
                              color: 'white',
                              fontWeight: 500,
                            }}
                            href={item.href}
                          >
                            {globalT('actions.homepage')}
                          </Link>
                        </Row>
                      </>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </Content>

          <InfoModal isOpen={isModalOpen} onClose={closeModal} body={selected?.description || ''} />

          <Logo />
        </ScrollView>
      </Box>
    </>
  );
}

export default OpenSourceUsed;
