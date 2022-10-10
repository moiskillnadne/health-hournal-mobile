import { useFetchLastHba1cQuery } from '.';

function useLastHbA1c() {
  const { data } = useFetchLastHba1cQuery();

  return {
    lastValue: data?.hba1c,
    goalValue: data?.goalHba1c,
  };
}

export default useLastHbA1c;
