import { useEffect, useMemo } from 'react';
import { Box, Row, Button, Text, Pressable, Spinner, ScrollView } from 'native-base';
import { FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-native';

import { HintIcon } from '@app/components/icons';
import { Header, Content, H1, Progress, Logo } from '@app/components';
import { CheckboxField, TextAreaField } from '@app/components/form';
import { useAppForm, useStepper, useAppSelector, useFetchConditionsQuery } from '@app/hooks';
import { isFirstItem, isLastItem } from '@app/utils';
import { CONDITION_NAMES } from '@app/constants';

import BackButton from '../BackButton';
import { useTranslate, usePersistOnChange } from '../../hooks';
import { ConditionsSchema } from '../../schemas';
import { ConditionsForm, Condition as TCondition } from '../../types';
import { SettingsIcon } from '../icons';
import { selectConditions } from '../../state';

function Conditions() {
  const t = useTranslate();

  const { progress, onNext } = useStepper();

  const navigate = useNavigate();

  const defaultValues = useAppSelector(selectConditions);

  const { data: conditionsData, isLoading } = useFetchConditionsQuery();

  const form = useAppForm<ConditionsForm>(
    {
      defaultValues: {
        conditions: defaultValues.conditions,
      },
    },
    { schema: ConditionsSchema },
  );

  const { handleSubmit, getValues, watch, setValue } = form;

  const conditions: TCondition[] = watch('conditions');

  const other = useMemo(
    () => conditions?.find(item => item.name === CONDITION_NAMES.OTHER),
    [conditions],
  );

  const noneOfAbove = useMemo(
    () => conditions?.find(item => item.name === CONDITION_NAMES.NONE_OF_ABOVE),
    [conditions],
  );

  const isEmptyForm = conditions
    ?.filter(item => item.name !== CONDITION_NAMES.OTHER)
    .every(item => !item.value);

  function onSubmit() {
    onNext(getValues());
  }

  function navigateUnits() {
    navigate('/private/settings/localization');
  }

  function disableNoneOfAbove() {
    if (noneOfAbove?.value) {
      const noneOfAboveIndex = conditions?.findIndex(
        item => item.name === CONDITION_NAMES.NONE_OF_ABOVE,
      );
      if (noneOfAboveIndex) {
        setValue(`conditions.${noneOfAboveIndex}.value` as any, false);
      }
    }
  }

  function changeCondition(value: boolean, name: string) {
    if (name === CONDITION_NAMES.NONE_OF_ABOVE && value) {
      conditions?.forEach((item, index) => {
        if (item.name !== CONDITION_NAMES.OTHER)
          return setValue(`conditions.${index}.value`, false);
      });
    } else {
      if (name !== CONDITION_NAMES.OTHER) disableNoneOfAbove();
    }
  }

  useEffect(() => {
    if (!defaultValues.conditions) {
      const initialForm = conditionsData?.map(item => ({
        id: item.id,
        name: item.name,
        value: false,
        info: undefined,
        description: item.description,
      }));
      setValue('conditions', initialForm);
    }
  }, [conditionsData, setValue, defaultValues]);

  usePersistOnChange(watch);

  return (
    <FormProvider {...form}>
      <Box flex={1}>
        <Header
          title={t('titles.health_assessment')}
          leftElement={<BackButton />}
          rightElement={
            <Pressable onPress={navigateUnits}>
              <SettingsIcon />
            </Pressable>
          }
        />

        <Progress value={progress} />

        <ScrollView _contentContainerStyle={{ flexGrow: 1 }}>
          <Content my={5}>
            <H1 mb={5}>{t('questions.have_conditions')}</H1>

            {isLoading && <Spinner size="lg" color="white" mb={4} />}

            <Box rounded={4} bgColor="white">
              <Box pl={4}>
                {conditions?.map((condition, index) => (
                  <Box
                    key={condition.name}
                    py={3}
                    pr={4}
                    borderTopWidth={isFirstItem(conditions, condition) ? 1 : 0}
                    borderBottomWidth={isLastItem(conditions, condition) ? 0 : 1}
                    borderColor="#e9e9e9"
                    mb={isLastItem(conditions, condition) ? 7 : 0}
                  >
                    <CheckboxField
                      orientation="left"
                      name={`conditions.${index}.value`}
                      accessibilityLabel={condition.name}
                      onChange={value => changeCondition(value, condition.name)}
                      isDisabled={isLastItem(conditions, condition) && isEmptyForm ? true : false}
                    >
                      <Row flex={1} flexWrap="wrap">
                        <Text
                          maxWidth={'90%'}
                          opacity={isLastItem(conditions, condition) && isEmptyForm ? 0.5 : 1}
                        >
                          {condition.name}
                        </Text>

                        {condition.description && (
                          <Pressable ml={1} mt={1} hitSlop={30}>
                            <HintIcon>{condition.description}</HintIcon>
                          </Pressable>
                        )}
                      </Row>
                    </CheckboxField>

                    {isLastItem(conditions, condition) ? (
                      <TextAreaField
                        name={`conditions.${index}.info`}
                        accessibilityLabel={t('form.other_condition')}
                        isDisabled={isEmptyForm || !other?.value}
                        textAreaStyles={{
                          mt: 4,
                          minH: 100,
                        }}
                        maxLength={128}
                      />
                    ) : null}
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              mt={5}
              onPress={handleSubmit(onSubmit)}
              isDisabled={(other?.value && !other.info) || isEmptyForm}
            >
              {t('buttons.next')}
            </Button>
          </Content>

          <Logo />
        </ScrollView>
      </Box>
    </FormProvider>
  );
}

export default Conditions;
