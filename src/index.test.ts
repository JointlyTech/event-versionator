import {
  EVENT_VERSIONING_RESET_STRING,
  getNextEventVersion,
  getVersionedEvent
} from './lib';

beforeEach(() => {
  getNextEventVersion(EVENT_VERSIONING_RESET_STRING);
});

it('should get the next event version in sequence', () => {
  expect(getNextEventVersion('a')).toBe(1);
  expect(getNextEventVersion('a')).toBe(2);
  expect(getNextEventVersion('b')).toBe(1);
  expect(getNextEventVersion('a')).toBe(3);
});

it('should return version 1 for a first-time event', () => {
  expect(getVersionedEvent({ event: 'test', payload: 1 }).version).toBe(1);
});

it('should return 1 for a first-time event if commit is false', () => {
  expect(getNextEventVersion('test', false)).toBe(1);
});

it('should return 2 for a second-time event if committed twice', () => {
  expect(getNextEventVersion('test', false)).toBe(1);
  expect(getNextEventVersion('test', true)).toBe(1);
  expect(getNextEventVersion('test', true)).toBe(2);
});

it('should return 2 for a second-time event if committed once', () => {
  expect(getNextEventVersion('test', false)).toBe(1);
  expect(getNextEventVersion('test', true)).toBe(1);
  expect(getNextEventVersion('test', false)).toBe(2);
  expect(getNextEventVersion('test', false)).toBe(2);
});
