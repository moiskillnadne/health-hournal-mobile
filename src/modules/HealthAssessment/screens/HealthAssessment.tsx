import { Stepper } from '@app/components/form';
import { useAppDispatch, useAppSelector, useFetchConditionsQuery } from '@app/hooks';
import { ErrorAlert, KeyboardAvoidingBox } from '@app/components';

import {
  Conditions,
  PersonalInformation,
  TellAboutHealth,
  AnswerMoreQuestions,
  NextDoctorsAppointment,
  TellAboutLifestyle,
  ScreeningTest,
  PapSmear,
  Mammogram,
  Congratulations,
} from '../components/form';
import { STEP_KEY } from '../constants';
import { changeHealthAssessment, getSummaryData } from '../utils';
import { selectHealthAssessment } from '../state';
import { useSaveHealthAssessmentMutation } from '../hooks';

const Steps = [
  PersonalInformation,
  Conditions,
  TellAboutHealth,
  AnswerMoreQuestions,
  NextDoctorsAppointment,
  TellAboutLifestyle,
  ScreeningTest,
  PapSmear,
  Mammogram,
  Congratulations,
];

function HealthAssessment() {
  const dispatch = useAppDispatch();

  const healthAssessment = useAppSelector(selectHealthAssessment);

  const [saveHealthAssessment, { error, isLoading: isSavingHealthAssessment }] =
    useSaveHealthAssessmentMutation();

  function onChangeData(step: number, data: any) {
    const key = STEP_KEY[step];

    if (!key) throw Error('[HealthAssessment]: Unknown step key provided');

    dispatch(changeHealthAssessment(STEP_KEY[step], data));
  }

  function onFinish() {
    if (!isSavingHealthAssessment) {
      const summaryData = getSummaryData(healthAssessment);

      return saveHealthAssessment(summaryData).unwrap();
    } else {
      return Promise.resolve();
    }
  }

  useFetchConditionsQuery();

  return (
    <KeyboardAvoidingBox>
      <Stepper onChangeData={onChangeData} onFinish={onFinish}>
        {Steps.map((Step, index) => (
          <Step key={index} />
        ))}
      </Stepper>

      {error && <ErrorAlert error={error}></ErrorAlert>}
    </KeyboardAvoidingBox>
  );
}

export default HealthAssessment;
