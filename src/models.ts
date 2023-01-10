export type VersionedEvent = InputEvent & {
  version: number;
  createdAt: Date;
  payload: unknown;
};

export type InputEvent = {
  event: string;
  payload?: unknown;
};

export type EventVersionatorInput = {
  event: string;
  commit: boolean;
};
