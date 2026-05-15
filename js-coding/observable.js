class Observer {
    constructor(observer, error, complete) {
        if (typeof observer === "object") {
            this.handlers = observer;
        } else {
            this.handlers = {
                next: observer,
                error,
                complete
            };
        }
    }

    next(val) {
        if (this.handlers.next) this.handlers.next(val);
    }

    error(err) {
        if (this.handlers.error) this.handlers.error(err);
        this.unsubscribe();
    }

    complete() {
        if (this.handlers.complete) this.handlers.complete();
        this.unsubscribe();
    }

    unsubscribe() {
        this.next = () => null;
        this.error = () => null;
        this.complete = () => null;
    }
}


class Observable {
    constructor(subscribe) {
        this.subscriptionFn = subscribe;
    }
    subscribe(...subscriber) {
        const observer = new Observer(...subscriber);
        this.subscriptionFn(observer);
        return {
            unsubscribe: () => observer.unsubscribe()
        }
    }
}



const observable = new Observable((subscriber) => {
    subscriber.next(1);
})
const values = [];
observable.subscribe(value => values.push(value))
console.log(values);