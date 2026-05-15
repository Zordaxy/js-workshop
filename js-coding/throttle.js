/**
 * @param {Function} func
 * @param {number} wait
 */
function throttle(func, wait) {
    let timer = null;
    let lastArgs = null;
    return function (...args) {
        if (timer) {
            lastArgs = args;
        } else {
            lastArgs = null;
            timer = setTimeout(() => {
                if (lastArgs) func.apply(this, lastArgs);
            }, wait);
            func.apply(this, args);
        }
    }
}