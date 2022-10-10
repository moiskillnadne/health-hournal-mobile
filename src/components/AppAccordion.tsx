import { useState, useMemo, PropsWithChildren, memo, FC } from 'react';
import { Box, Row, Column, Text, Pressable } from 'native-base';
import { useMatch, useLocation, matchPath, useNavigate } from 'react-router-native';
import Accordion from 'react-native-collapsible/Accordion';
import { useIsConnected } from 'react-native-offline';

import { useCommonTranslate } from '@app/hooks';
import { noop } from '@app/utils';

import {
  HomeIcon,
  MyWellnessJourneyIcon,
  HealthRecordIcon,
  FoodIcon,
  DrawerArrowIcon,
  LifestyleTrackerIcon,
  ContentGalleryIcon,
} from './icons';

type Props = {
  onClose: () => void;
};

type Section = {
  Icon: FC;
  title: string;
  disabled?: boolean;
  items?: Option[];
  href?: string;
};

type Option = {
  title: string;
  href: string;
  disabled?: boolean;
  searchParams?: string;
};

function AppAccordion({ onClose }: Props) {
  const [selected, setSelected] = useState<number[]>([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const t = useCommonTranslate();

  const isConnected = useIsConnected();

  const sections: Section[] = useMemo(
    () => [
      {
        Icon: HomeIcon,
        title: t('titles.home'),
        href: '/private/home',
      },
      {
        Icon: MyWellnessJourneyIcon,
        title: t('titles.my_wellness_journey'),
        disabled: !isConnected,
        items: [
          {
            title: t('titles.my_videos'),
            href: '/private/my-wellness-journey/videos',
            disabled: !isConnected,
          },
          {
            title: t('titles.my_articles'),
            href: '/private/my-wellness-journey/articles',
            disabled: !isConnected,
          },
          {
            title: t('titles.my_recipes'),
            href: '/private/my-wellness-journey/recipes',
            disabled: !isConnected,
          },
        ],
      },
      {
        Icon: HealthRecordIcon,
        title: t('titles.health_record'),
        items: [
          {
            title: t('titles.my_medications'),
            href: '/private/health-record/medications',
            disabled: !isConnected,
          },
          {
            title: t('titles.vitals_&_labs'),
            href: '/private/health-record/vitals',
            searchParams: '?blood-sugar=random&cholesterol=ldl',
          },
          {
            title: t('titles.conditions'),
            href: '/private/health-record/conditions',
            disabled: !isConnected,
          },
          {
            title: t('titles.doctor_visits'),
            href: '/private/health-record/doctor_visits',
            disabled: !isConnected,
          },
          {
            title: t('titles.additional_information'),
            href: '/private/health-record/additional_information',
          },
        ],
      },
      {
        Icon: FoodIcon,
        title: t('titles.food_is_medicine'),
        href: '/private/food',
        disabled: !isConnected,
      },
      {
        Icon: LifestyleTrackerIcon,
        title: t('titles.my_lifestyle_tracker'),
        href: '/private/lifestyle-tracker',
      },
      {
        Icon: ContentGalleryIcon,
        title: t('titles.content_gallery'),
        href: '/private/content-gallery',
        disabled: !isConnected,
      },
    ],
    [t, isConnected],
  );

  return (
    <Accordion
      activeSections={selected}
      sections={sections}
      renderSectionTitle={() => <></>}
      underlayColor="rgba(255, 255, 255, 0.15)"
      renderContent={content =>
        content.items ? (
          <Column>
            {content.items.map(item => (
              <Section
                key={item.title}
                href={item.href}
                searchParams={item.searchParams}
                onClose={onClose}
                disabled={item.disabled}
              >
                {item.title}
              </Section>
            ))}
          </Column>
        ) : (
          <></>
        )
      }
      renderHeader={content => {
        const active = matchPath(content.href ?? '', pathname);

        function navigateScreen() {
          if (content.href) {
            navigate(content.href);
            onClose();
          }
        }

        return (
          <Pressable
            onPress={content.disabled ? noop : navigateScreen}
            disabled={!content.href || !!content.items}
          >
            {({ isPressed }) => (
              <Row
                justifyContent="space-between"
                pl={6}
                pr={2.5}
                py={3}
                bgColor={isPressed || active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'}
                opacity={content.disabled ? 0.5 : 1}
              >
                <Row>
                  <content.Icon />

                  <Text ml={2.5} color="white">
                    {content.title}
                  </Text>
                </Row>

                {content.items && <DrawerArrowIcon type={active ? 'up' : 'down'} />}
              </Row>
            )}
          </Pressable>
        );
      }}
      onChange={setSelected}
    />
  );
}

type SectionProps = PropsWithChildren<{
  href: string;
  onClose: () => void;
  searchParams?: string;
  disabled?: boolean;
}>;

function Section({ children, href, searchParams, onClose, disabled }: SectionProps) {
  const isActive = useMatch(href);

  const navigate = useNavigate();

  const bgColor = isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent';

  function onPress() {
    if (href) {
      onClose();
      navigate({ pathname: href, search: searchParams ? searchParams : undefined });
    }
  }

  return (
    <Pressable onPress={disabled ? noop : onPress}>
      <Box
        py={3}
        pl={isActive ? '54px' : '58px'}
        borderLeftWidth={isActive ? 4 : 0}
        borderLeftColor="#3EA832"
        bgColor={bgColor}
      >
        <Text color="white" opacity={disabled ? 0.5 : 1}>
          {children}
        </Text>
      </Box>
    </Pressable>
  );
}

export default memo(AppAccordion);
