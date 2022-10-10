export type ContentProps = {
  title: string;
  sourceUrl: string;
  body: string;
  onEnd?: () => unknown;
  summary?: string;
};
