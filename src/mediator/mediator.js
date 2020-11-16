class Mediator {
    constructor() {
        this.obj = {
            subscriptions: {}
        }
    }

    subscribe(subscription, callback) {
        if (!this.obj.subscriptions[subscription]) this.obj.subscriptions[subscription] = [];
        this.obj.subscriptions[subscription].push({context: this, callback: callback})
    }

    unsubscribe(subscription, callback) {
        this.obj.subscriptions[subscription] = this.obj.subscriptions[subscription]
            .filter(sub => sub !== callback)
    }

    exec(subscription, ...args) {
        this.obj.subscriptions[subscription].forEach(function (sub) {
            sub(...args)
        })
    }
}