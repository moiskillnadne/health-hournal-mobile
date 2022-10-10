import { useForm, UseFormProps, Resolver, FieldValues } from 'react-hook-form';
import type { AnyObjectSchema } from 'yup';

import useValidationResolver from './useValidationResolver';

type HookProps = {
  schema: AnyObjectSchema;
  context?: any;
};

function useAppForm<TFieldValues extends FieldValues>(
  props: UseFormProps<TFieldValues>,
  { schema, context }: HookProps,
) {
  const resolver: Resolver<TFieldValues> = useValidationResolver(schema, context);

  return useForm({
    ...props,
    resolver,
  });
}

export default useAppForm;
