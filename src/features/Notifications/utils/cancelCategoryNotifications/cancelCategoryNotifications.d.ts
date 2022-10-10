import { NOTIFICATION_CATEGORY } from '../../types';

export * from './cancelCategoryNotifications.android';
export * from './cancelCategoryNotifications.ios';

export type CancelCategoryNotifications = (category: NOTIFICATION_CATEGORY) => Promise<void>;
