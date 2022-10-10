import { useFetchLastBloodPressureQuery } from '.';

function useLastBloodPressure() {
  const { data } = useFetchLastBloodPressureQuery();

  const lastValue = {
    systolic: data?.pressureSystolicMmHg,
    diastolic: data?.pressureDiastolicMmHg,
  };

  const goalValue = {
    systolic: data?.goalPressureSystolicMmHg,
    diastolic: data?.goalPressureDiastolicMmHg,
  };

  return {
    lastValue,
    goalValue,
  };
}

export default useLastBloodPressure;
