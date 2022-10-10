import { object, string, boolean, number } from 'yup';

const TellAboutLifestyleSchema = object({
  averageDailyWaterIntake: string(),
  averageDailySleepHours: string().test({
    name: 'less than 24',
    test: value => !value || +value <= 24,
    message: 'errors.format',
  }),
  sleepQualityRating: number(),
  overallHealthRating: number(),
  hasDepressionOrAnxiety: string(),
  noAnswerOnDepressionOrAnxiety: string(),
  reverseOrBetterManage: boolean(),
  loseWeight: boolean(),
  improveLabWorkWithoutMedications: boolean(),
  feelBetter: boolean(),
  lowerHealthcareCost: boolean(),
  decreaseOrGetOffMedications: boolean(),
  none: boolean(),

  money: boolean(),
  time: boolean(),
  energy: boolean(),
  socialLife: boolean(),
  unsureWhatToDo: boolean(),
  emotionalConnectWithFoodDrinks: boolean(),
  liveHealthyLifestyle: boolean(),
  other: string().max(128),
});

export default TellAboutLifestyleSchema;
