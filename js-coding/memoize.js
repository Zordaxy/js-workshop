/**
 * @param { (...args: any[]) => any } fn
 * @param { (...args: any[]) => string } [resolver]
 * @returns { (...args: any[]) => any }
 */
function memoize(fn, resolver = (...args) => JSON.stringify(args)) {
    const cache = new Map();

    return function memoized(...args) {
        const key = resolver(...args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// ── Quick smoke tests ───────────────────────────────────────────────

function addRaw(a, b) {
    console.log("computed");
    return a + b;
}

const add = memoize(addRaw);

console.log(add(1, 2)); // computed -> 3
console.log(add(1, 2)); // 3  (cached, no "computed" log)

const addCustom = memoize(addRaw, (a, b) => `${a}+${b}`);

console.log(addCustom(3, 4)); // computed -> 7
console.log(addCustom(3, 4)); // 7  (cached)
