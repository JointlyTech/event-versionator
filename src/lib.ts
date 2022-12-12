export const EVENT_VERSIONING_RESET_STRING = 'EVENT_VERSIONING_RESET_STRING';

export const getNextEventVersion = (() => {
  let internalVersioning = {};
  return (event: string, commit = true): number => {
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

export type VersionedEvent = {
  event: string;
  payload: unknown;
  version: number;
};

export const getVersionedEvent = ({
  event,
  payload
}: {
  event: string;
  payload: unknown;
}): VersionedEvent => ({
  event,
  version: getNextEventVersion(event, true),
  payload
});
