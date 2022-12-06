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

export const getVersionedEvent = ({
  event,
  payload
}: {
  event: string;
  payload: unknown;
}): {
  event: string;
  payload: unknown;
  version: number;
} => {
  const eventObject = {
    event,
    version: getNextEventVersion(event, true),
    payload
  };
  return eventObject;
};
