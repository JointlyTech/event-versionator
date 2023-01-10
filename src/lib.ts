import { defaultEventVersionatorOptions } from './default';
import { EventVersionatorInput, VersionedEvent, InputEvent } from './models';

export const EVENT_VERSIONING_RESET_STRING = 'EVENT_VERSIONING_RESET_STRING';

export const getNextEventVersion = (() => {
  let internalVersioning = {};

  return (options?: Partial<EventVersionatorInput>): number => {
    const { event, commit }: EventVersionatorInput = {
      ...defaultEventVersionatorOptions,
      ...(options || {})
    };
    if (EVENT_VERSIONING_RESET_STRING === event) {
      internalVersioning = {};
      return 0;
    }
    if (!internalVersioning[event]) {
      internalVersioning[event] = 0;
    }
    if (commit) return ++internalVersioning[event];
    return internalVersioning[event] + 1;
  };
})();

export const getVersionedEvent = (options?: InputEvent): VersionedEvent => {
  options = options || { event: '' };
  return {
    event: options?.event,
    version: getNextEventVersion({ event: options?.event, commit: true }),
    payload: options?.payload || null,
    createdAt: new Date()
  };
};
