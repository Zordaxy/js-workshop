function promisify(fn) {
    return function (...args) {
        return new Promise(resolve => {
            let result = fn.apply(this, args);
            resolve(result);
        });
    }
}

const exampleFn = (a, b) => a + b;
const promisified = promisify(exampleFn);
promisified(5, 15).then(res => console.log(res)); //20