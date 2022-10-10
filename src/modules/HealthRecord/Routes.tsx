import { Route, Routes } from 'react-router-native';

import {
  HealthRecord,
  Medications,
  VitalsLabs,
  Conditions,
  AdditionalInfo,
  BloodSugarAnalytics,
  Events,
  CholesterolAnalytics,
  BloodPressureAnalytics,
  WeightAnalytics,
  HbA1cAnalytics,
} from './screens';

export default function () {
  return (
    <Routes>
      <Route element={<HealthRecord />}>
        <Route path="medications" element={<Medications />} />

        <Route path="vitals" element={<VitalsLabs />} />

        <Route path="conditions" element={<Conditions />} />

        <Route path="doctor_visits" element={<Events />} />

        <Route path="additional_information" element={<AdditionalInfo />} />
      </Route>

      <Route path="blood_sugar_analytics" element={<BloodSugarAnalytics />} />

      <Route path="cholesterol_analytics" element={<CholesterolAnalytics />} />

      <Route path="blood_pressure_analytics" element={<BloodPressureAnalytics />} />

      <Route path="weight_analytics" element={<WeightAnalytics />} />

      <Route path="hba1c_analytics" element={<HbA1cAnalytics />} />
    </Routes>
  );
}
