import type { EventOptions } from './useForegroundEvent.ios';

export * from './useForegroundEvent.android';
export * from './useForegroundEvent.ios';

export type UseForegroundEvent = (options: EventOptions) => void;
