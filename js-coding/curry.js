/**
 * @param { (...args: any[]) => any } fn
 * @returns { (...args: any[]) => any }
 */
function curry(fn) {
    return function curried(...args) {
        if (fn.length <= args.length) return fn.apply(this, args);
        return (...args2) => curried(...args, ...args2);
    }
}