import {
  EVENT_VERSIONING_RESET_STRING,
  getNextEventVersion,
  getVersionedEvent
} from './lib';

beforeEach(() => {
  getNextEventVersion({ event: EVENT_VERSIONING_RESET_STRING });
});

it('should get the next event version in sequence', () => {
  expect(getNextEventVersion({ event: 'a' })).toBe(1);
  expect(getNextEventVersion({ event: 'a' })).toBe(2);
  expect(getNextEventVersion({ event: 'b' })).toBe(1);
  expect(getNextEventVersion({ event: 'a' })).toBe(3);
});

it('should return version 1 for a first-time event', () => {
  expect(getVersionedEvent({ event: 'test', payload: 1 }).version).toBe(1);
});

it('should return 1 for a first-time event if commit is false', () => {
  expect(getNextEventVersion({ event: 'test', commit: false })).toBe(1);
});

it('should return 2 for a second-time event if committed twice', () => {
  expect(getNextEventVersion({ event: 'test', commit: false })).toBe(1);
  expect(getNextEventVersion({ event: 'test', commit: true })).toBe(1);
  expect(getNextEventVersion({ event: 'test', commit: true })).toBe(2);
});

it('should return 2 for a second-time event if committed once', () => {
  expect(getNextEventVersion({ event: 'test', commit: false })).toBe(1);
  expect(getNextEventVersion({ event: 'test', commit: true })).toBe(1);
  expect(getNextEventVersion({ event: 'test', commit: false })).toBe(2);
  expect(getNextEventVersion({ event: 'test', commit: false })).toBe(2);
});

it('should return the correct version for an empty event', () => {
  expect(getVersionedEvent().version).toBe(1);
  expect(getVersionedEvent().version).toBe(2);
  expect(getNextEventVersion()).toBe(3);
  expect(getNextEventVersion()).toBe(4);
  expect(getNextEventVersion({ commit: false })).toBe(5);
  expect(getNextEventVersion({ commit: false })).toBe(5);
});
