const EventBus = {

    events: {},

    on(eventName, callback) {

        if (!this.events[eventName]) {

            this.events[eventName] = [];

        }

        this.events[eventName].push(callback);

    },

    off(eventName, callback) {

        if (!this.events[eventName]) {
            return;
        }

        this.events[eventName] = this.events[eventName]
            .filter(listener => listener !== callback);

    },

    emit(eventName, data = null) {

        if (!this.events[eventName]) {
            return;
        }

        this.events[eventName]
            .forEach(listener => listener(data));

    }

};