import { useEffect } from 'react';

import { useUpdateArticleMutation, useUpdateRecipeMutation, useUpdateVideoMutation } from '.';

type QueryHook =
  | typeof useUpdateArticleMutation
  | typeof useUpdateRecipeMutation
  | typeof useUpdateVideoMutation;

function useMarkAsViewed(useQuery: QueryHook, id: string | undefined, enabled = true) {
  const [update] = useQuery();

  useEffect(() => {
    if (id && enabled) {
      update({ id, isVisited: true });
    }
  }, [enabled, id, update]);
}

export default useMarkAsViewed;
