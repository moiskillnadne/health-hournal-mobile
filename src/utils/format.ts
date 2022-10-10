import { format } from 'date-fns';

export const formatDate = (value: string | number, pattern = 'MMMM d, yyyy'): string => {
  return format(new Date(value), pattern);
};
