import { useCallback } from 'react';
import { AnySchema, ValidationError as YValidationError } from 'yup';
import { FieldValues } from 'react-hook-form';

import { makeObjectFromPath, mergeDeep } from '@app/utils';

import { ValidationError } from '../types';

type ValidateResult = {
  values: any;
  errors: Record<string, ValidationError>;
};

function useValidationResolver(validationSchema: AnySchema, context?: any) {
  return useCallback(
    async (data: FieldValues): Promise<ValidateResult> => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
          context,
        });

        return {
          values,
          errors: {},
        };
      } catch (e) {
        if (e instanceof YValidationError) {
          const errors = e as unknown as YValidationError;

          return {
            values: {},
            errors: errors.inner.reduce((allErrors, currentError) => {
              const path = currentError.path ?? '';

              const error = makeObjectFromPath(path, {
                type: currentError.type ?? 'validation',
                message: currentError.message,
                params: currentError.params,
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              return mergeDeep(allErrors, error);
            }, {}),
          };
        } else {
          return {
            values: {},
            errors: {
              unknown: {
                type: 'compilcation',
                message: (e as Error).message,
              },
            },
          };
        }
      }
    },
    [validationSchema],
  );
}

export default useValidationResolver;
