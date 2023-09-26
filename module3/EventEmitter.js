module.exports = class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {
        if (!Array.isArray(this.listeners[eventName])) {
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(fn);
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        if (!Array.isArray(this.listeners[eventName])) {
            return;
        }

        const eventIndex = this.listeners[eventName].findIndex((item) => item === fn);
        if (eventIndex === -1) {
            return;
        }

        this.listeners[eventName].splice(eventIndex, 1);
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        this.addListener(eventName, (...args) => {
            fn(...args);
            this.removeListener(eventName, fn);
        });
    }

    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return;
        }

        this.listeners[eventName].forEach((item) => {
            item(...args);
        });
    }

    listenerCount(eventName) {
        return this.listeners[eventName]?.length || 0;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}