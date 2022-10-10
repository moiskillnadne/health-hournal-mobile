import { MaskService } from 'react-native-masked-text';

import { isFloat, mergeDateAndTime } from '@app/utils';

import {
  UpdateMedicationRequest,
  AddMedicationRequest,
  AddWeightRequest,
  AddBloodPressureRequest,
  AddRandomBloodSugarRequest,
  AddFastingBloodSugarRequest,
  AddAfterMealBloodSugarRequest,
  AddLdlRequest,
  AddTriglycerideRequest,
  AddProcedureRequest,
  UpdateProcedureRequest,
  AddHba1cRequest,
} from '../state';
import {
  Medication as TMedication,
  AddBloodSugarForm,
  AddCholesterolForm,
  ProcedureEditorForm,
  AddWeightForm,
  AddHba1cForm,
  AddBloodPressureForm,
} from '../types';

export { default as sharePDF } from './sharePDF';

export function stringifyWithCommas(values: (string | undefined)[]) {
  return values.filter(value => value).join(', ');
}

export function transformMoney(money: string) {
  return MaskService.toMask('money', money, {
    precision: 0,
    separator: '',
    delimiter: ',',
    unit: '',
  });
}

const PERIODS_LABELS: { [key: string]: string } = {
  daily: 'Day',
  monthly: 'Month',
  weekly: 'Week',
  yearly: 'Year',
};

export function formatPressure(pressureSystolic?: number, pressureDiastolic?: number) {
  return pressureSystolic && pressureDiastolic ? `${pressureSystolic}/${pressureDiastolic}` : null;
}

export function stringifyPeriod(frequency: string, period: string) {
  return `${frequency} a ${PERIODS_LABELS[period]}`;
}

export const Medications = {
  toAddData({ medicationProductId, frequency, period, amount, currency }: TMedication) {
    return [
      {
        id: medicationProductId,
        frequency: Number(frequency),
        period,
        amount: amount ? Number(amount.replace(/,/g, '')) : null,
        ...(currency && { currency }),
      },
    ] as AddMedicationRequest;
  },

  toUpdateData(
    { id, medicationProductId, amount, currency, frequency, period }: TMedication,
    status: string,
  ) {
    return {
      body: {
        id: medicationProductId,
        amount: amount ? Number(amount.replace(/,/g, '')) : null,
        ...(currency && { currency }),
        frequency: Number(frequency),
        period,
        status,
      },
      id,
    } as UpdateMedicationRequest;
  },
};

export const BloodSugar = {
  toRandomData({ bloodSugar, goalBloodSugar }: AddBloodSugarForm): AddRandomBloodSugarRequest {
    return {
      randomBloodSugar: {
        mgDl: bloodSugar.mgDl ? +bloodSugar.mgDl : undefined,
        mmolL: bloodSugar.mmolL ? +bloodSugar.mmolL : undefined,
        datetime: mergeDateAndTime(bloodSugar.date, bloodSugar.time),
      },
      goalRandomBloodSugar: {
        mgDl: goalBloodSugar.mgDl ? +goalBloodSugar.mgDl : undefined,
        mmolL: goalBloodSugar.mmolL ? +goalBloodSugar.mmolL : undefined,
      },
    };
  },

  toFastingData({ bloodSugar, goalBloodSugar }: AddBloodSugarForm): AddFastingBloodSugarRequest {
    return {
      fastingBloodSugar: {
        mgDl: bloodSugar.mgDl ? +bloodSugar.mgDl : undefined,
        mmolL: bloodSugar.mmolL ? +bloodSugar.mmolL : undefined,
        datetime: mergeDateAndTime(bloodSugar.date, bloodSugar.time),
      },
      goalFastingBloodSugar: {
        mgDl: goalBloodSugar.mgDl ? +goalBloodSugar.mgDl : undefined,
        mmolL: goalBloodSugar.mmolL ? +goalBloodSugar.mmolL : undefined,
      },
    };
  },

  toAfterMealData({
    bloodSugar,
    goalBloodSugar,
  }: AddBloodSugarForm): AddAfterMealBloodSugarRequest {
    return {
      afterMealBloodSugar: {
        mgDl: bloodSugar.mgDl ? +bloodSugar.mgDl : undefined,
        mmolL: bloodSugar.mmolL ? +bloodSugar.mmolL : undefined,
        datetime: mergeDateAndTime(bloodSugar.date, bloodSugar.time),
      },
      goalAfterMealBloodSugar: {
        mgDl: goalBloodSugar.mgDl ? +goalBloodSugar.mgDl : undefined,
        mmolL: goalBloodSugar.mmolL ? +goalBloodSugar.mmolL : undefined,
      },
    };
  },
};

export const Cholesterol = {
  toLdlData({ cholesterol, goalCholesterol }: AddCholesterolForm): AddLdlRequest {
    return {
      goalLdl: {
        mgDl: goalCholesterol.mgDl ? +goalCholesterol.mgDl : undefined,
        mmolL: goalCholesterol.mmolL ? +goalCholesterol.mmolL : undefined,
      },
      ldl: {
        mgDl: cholesterol.mgDl ? +cholesterol.mgDl : undefined,
        mmolL: cholesterol.mmolL ? +cholesterol.mmolL : undefined,
        datetime: mergeDateAndTime(cholesterol.date, cholesterol.time),
      },
    };
  },

  toTriglycerideData({ cholesterol, goalCholesterol }: AddCholesterolForm): AddTriglycerideRequest {
    return {
      goalTriglyceride: {
        mgDl: goalCholesterol.mgDl ? +goalCholesterol.mgDl : undefined,
        mmolL: goalCholesterol.mmolL ? +goalCholesterol.mmolL : undefined,
      },
      triglyceride: {
        mgDl: cholesterol.mgDl ? +cholesterol.mgDl : undefined,
        mmolL: cholesterol.mmolL ? +cholesterol.mmolL : undefined,
        datetime: mergeDateAndTime(cholesterol.date, cholesterol.time),
      },
    };
  },
};

export const Procedure = {
  toAddData(data: ProcedureEditorForm): AddProcedureRequest {
    const { procedureId, date, time, name, repeatEnabled, frequency, period } = data;

    return {
      id: procedureId,
      datetime: mergeDateAndTime(date, time),
      ...(name && { name }),
      ...(repeatEnabled && {
        interval: frequency ? +frequency : 0,
        period: period ? period : undefined,
      }),
    };
  },

  toUpdateData(data: ProcedureEditorForm, id: string): UpdateProcedureRequest {
    const { procedureId, date, time, name, repeatEnabled, frequency, period } = data;

    return {
      id,
      procedureId,
      datetime: mergeDateAndTime(date, time),
      ...(name && { name }),
      ...(repeatEnabled && {
        interval: frequency ? +frequency : 0,
        period: period ? period : undefined,
      }),
    };
  },
};

export const Weight = {
  toAddData(data: AddWeightForm): AddWeightRequest {
    return {
      weight: {
        kg: data.weight.kg ? +data.weight.kg : undefined,
        lb: data.weight.lb ? +data.weight.lb : undefined,
        datetime: mergeDateAndTime(data.weight.date, data.weight.time),
      },
      goalWeight: {
        kg: data.goalWeight.kg ? +data.goalWeight.kg : undefined,
        lb: data.goalWeight.lb ? +data.goalWeight.lb : undefined,
      },
    };
  },
};

export const BloodPressure = {
  toAddData(data: AddBloodPressureForm): AddBloodPressureRequest {
    return {
      systolic: +data.systolic,
      diastolic: +data.diastolic,
      goalPressureSystolic: data.goalPressureSystolic ? +data.goalPressureSystolic : undefined,
      goalPressureDiastolic: data.goalPressureDiastolic ? +data.goalPressureDiastolic : undefined,
      datetime: mergeDateAndTime(data.date, data.time),
    };
  },
};

export const formatNumberValue = (value: number | undefined) =>
  isFloat(value) && value ? +value.toFixed(2) : value;

export const HbA1c = {
  toApiData({ hba1c, goalHba1c }: AddHba1cForm): AddHba1cRequest {
    return {
      hba1c: {
        percent: hba1c.percent,
        datetime: mergeDateAndTime(hba1c.date, hba1c.time),
      },
      goalHba1c,
    };
  },
};
