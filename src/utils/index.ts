import { useLayoutEffect } from 'react';
import { Keyboard, GestureResponderEvent, LogBox, Platform } from 'react-native';
import { isValid, set, getMinutes, getHours } from 'date-fns';
import Crashlytics from '@react-native-firebase/crashlytics';
import { QueryFulfilledRejectionReason } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

import { CustomFetchBaseQuery } from '@app/types';

export * from './alerts';
export * from './formulas';
export * from './format';

const MS_PER_SEC = 1000;

const SEC_PER_MIN = 60;

const MS_PER_MIN = MS_PER_SEC * SEC_PER_MIN;

type TimerOptions = {
  onFinish?: () => void;
  onChange?: (seconds: number) => void;
};

export function Timer(seconds = 0, { onFinish, onChange }: TimerOptions = {}) {
  let currentSeconds = seconds;
  let timerId: NodeJS.Timer;

  function start() {
    timerId = setInterval(() => {
      if (currentSeconds) {
        currentSeconds = currentSeconds - 1;
        onChange && onChange(currentSeconds);
      } else {
        stop();
        onFinish && onFinish();
      }
    }, 1000);
  }

  function stop() {
    clearInterval(timerId);
  }

  function reset() {
    stop();
    currentSeconds = seconds;
    onChange && onChange(currentSeconds);
    start();
  }

  return {
    start,
    stop,
    reset,
  };
}

export const onMount = (cb: () => unknown) =>
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    cb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

export function isLastItem(array: any[], item: any) {
  const lastItem = array.slice(-1).pop();

  return lastItem === item;
}

export function isFirstItem(array: any[], item: any) {
  const firstItem = array.slice(0, 1).pop();

  return firstItem === item;
}

export function makeObjectFromPath(path: string, value: any) {
  const paths = path.split('.');

  return paths.reduceRight(
    (acc, item, index) => ({
      [item]: index === paths.length - 1 ? value : acc,
    }),
    {},
  );
}

export function isObject(item: unknown) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function mergeDeep(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
): any {
  if (!sources.length) return target;

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });

        mergeDeep(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve as () => void, ms));
}

export function noop() {}

export function dismissKeyboard(maybeFn: unknown) {
  if (typeof maybeFn === 'function') {
    return (event: GestureResponderEvent) => {
      Keyboard.dismiss();
      maybeFn(event);
    };
  } else {
    throw Error('[dismissKeyboard]: Provided parameter is not a function');
  }
}

export function disableLogs() {
  if (__DEV__) {
    const ignoreWarns = [
      'Remote debugger is in a background',
      'EventEmitter.removeListener',
      'ViewPropTypes will be removed from React Native',
      'Require cycle: node_modules/victory-vendor/lib-vendor/d3-interpolate/src/value.js -> node_modules/victory-vendor/lib-vendor/d3-interpolate/src/object.js',
      'When server rendering, you must wrap your application in an <SSRProvider>',
      'Require cycle: node_modules/rn-fetch-blob/index.js',
    ];

    const warn = console.warn;

    console.warn = (...arg: unknown[]) => {
      for (const warning of ignoreWarns) {
        if (typeof arg[0] === 'string' && arg[0].startsWith(warning)) {
          return;
        }
      }
      warn(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
  }
}

export function toLocalDate(date: string | Date): Date {
  const value = new Date(date);

  if (!isValid(value)) {
    throw Error('[toLocalDate]: provided parameter is not valid date string');
  }

  return new Date(value.valueOf() + value.getTimezoneOffset() * MS_PER_MIN);
}

export function range(start: number, stop: number, step = 1) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}

export function isNetworkLostError(error: QueryFulfilledRejectionReason<CustomFetchBaseQuery>) {
  return (error.error as { error: string }).error === 'TypeError: Network request failed';
}

export function isFloat(number: Maybe<number>) {
  return typeof number === 'number' && number % 1 !== 0;
}

export function deepCopy<T>(o: T): T {
  return typeof o === 'object' ? (JSON.parse(JSON.stringify(o)) as T) : o;
}

export function setCrashlytics(id: string, email: string) {
  const crashlytics = Crashlytics();

  crashlytics.setUserId(id);
  crashlytics.setAttributes({ email });
}

export function mergeDateAndTime(date: string, time: string) {
  return set(new Date(date), {
    hours: getHours(new Date(time)),
    minutes: getMinutes(new Date(time)),
    seconds: 0,
  }).toUTCString();
}

export const isAndroid12orHigher = Platform.OS === 'android' && Platform.Version >= 31;
