import { ValueOf } from '@app/types';

import { NOTIFICATION_CATEGORIES, NOTIFICATION_ACTIONS } from './constants';

export type Action = {
  id: ValueOf<typeof NOTIFICATION_ACTIONS>;
  title: string;
  foreground?: boolean;
};

export type AndroidAction = Record<string, Action>;

export type NOTIFICATION_CATEGORY =
  typeof NOTIFICATION_CATEGORIES[keyof typeof NOTIFICATION_CATEGORIES];

export type Template = {
  title?: string;
  subtitle?: string;
  body?: string;
};

type Attachment = {
  url: string;
};

export type FirebaseNotification = {
  title: string;
  body: string;
  subtitle?: string;
  datetime: string;
  ios: {
    categoryId: NOTIFICATION_CATEGORY;
    attachments: Attachment[];
  };
  android: { channelId: NOTIFICATION_CATEGORY };
  data: Record<string, string> &
    Partial<{
      id: string;
      videoId: string;
      articleId: string;
      recipeId: string;
      appointmentId: string;
      procedureId: string;
      userProcedureId: string;
      userId: string;
      isViewed: 'true' | 'false';
      isContentValid?: 'true' | 'false';
    }>;
};

export type RemoteMessage = {
  data?: Record<string, string> | undefined;
};
