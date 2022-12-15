# What is it?

This is a library for versioning given events. It's used to
ensure that we are able to monitor the number of iterations of a given event and to
ensure that we can re-build the original order.

# How do I install it?

You can install it by using the following command:

```bash
npm install @jointly/event-versionator
```

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# How does it work?

Just call the `getVersionedEvent` function with the event you want to version and it will return a new event with the versioning information.  
the function expects to receive an object with the following properties:

- `event` - the event you want to version
- `payload` - the payload of the event

The return value is an object with the following properties:

- `event` - the given event
- `version` - the version of the event
- `payload` - the payload of the event
- `createdAt` - the date when the specific event version was created

```js
const { getVersionedEvent } = require('@jointly/event-versionator');
getVersionedEvent({ event: 'ev1', payload: 'ev1-1' }); // { event: 'ev1', version: 1, payload: 'ev1-1', createdAt: '1970-01-01T14:00:00.000Z' }
getVersionedEvent({ event: 'ev1', payload: 'ev1-2' }); // { event: 'ev1', version: 2, payload: 'ev1-2', createdAt: '1970-01-01T14:00:03.123Z' }
getVersionedEvent({ event: 'ev1', payload: 'ev1-3' }); // { event: 'ev1', version: 3, payload: 'ev1-3', createdAt: '1970-01-01T14:00:06.246Z' }
getVersionedEvent({ event: 'ev2', payload: 'ev2-1' }); // { event: 'ev2', version: 1, payload: 'ev2-1', createdAt: '1970-01-01T14:00:09.369Z' }
getVersionedEvent({ event: 'ev2', payload: 'ev2-2' }); // { event: 'ev2', version: 2, payload: 'ev2-2', createdAt: '1970-01-01T14:00:12.492Z' }
```

# Other Info

You can also call the `getNextEventVersion` function to get the next version of a given event.  
By passing a `false` as the second argument, you can get the next version of the event without committing (saving it) in the function internal state.  
You can also call the `getNextEventVersion` passing the `EVENT_VERSIONING_RESET_STRING` exported constant as the first argument to reset the internal state of the function and consequently resetting all saved version values.
