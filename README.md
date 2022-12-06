# What is it?

This is a library for versioning given events. It's used to
ensure that we are able to monitor the number of iterations of a given event and to
ensure that we can re-build the original order.

# How does it work?

Just call the `getVersionedEvent` function with the event you want to version and it will return a new event with the versioning information.  
the function expects to receive an object with the following properties:

- `event` - the event you want to version
- `payload` - the payload of the event

The return value is an object with the following properties:

- `event` - the given event
- `version` - the version of the event
- `payload` - the payload of the event

# Other Info

You can also call the `getNextEventVersion` function to get the next version of a given event.  
By passing a `false` as the second argument, you can get the next version of the event without committing (saving it) in the function internal state.  
You can also call the `getNextEventVersion` passing the `EVENT_VERSIONING_RESET_STRING` exported constant as the first argument to reset the internal state of the function and consequently resetting all saved version values.

# ToDo

- [x] Add documentation
- [x] Add POC
- [x] Allow resetting
- [x] Add tests
