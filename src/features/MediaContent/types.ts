export type MediaContent = {
  id: string;
  isFavorite: boolean;
  isViewed?: boolean;
  isVisited: boolean;
};

export type Article = MediaContent & {
  title: string;
  text: string;
  summary: string;
  sourceUrl: string;
  isArticle: boolean;
};

export type Video = MediaContent & {
  title: string;
  description: string;
  sourceUrl: string;
};

export type ContentSummary = {
  id: string;
  date: string;
  title: string;
  preview: string;
  isFavorite: boolean;
  isVisited: boolean;
  isViewed: boolean;
};

export type Track = {
  id: string;
  name: string;
  items: ContentSummary[];
};
