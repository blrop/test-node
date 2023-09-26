class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {}

    on(eventName, fn) {}

    removeListener(eventName, fn) {}

    off(eventName, fn) {}

    once(eventName, fn) {}

    emit(eventName, ...args) {}

    listenerCount(eventName) {}

    rawListeners(eventName) {}
}