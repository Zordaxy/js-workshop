/**
 * @param { Array } arr
 * @param { number } depth
 */
function flat(arr, depth = 1) {
    let res = [];
    for (let entry of arr) {
        if (Array.isArray(entry) && depth > 0) {
            res.push(...flat(entry, depth - 1));
        } else {
            res.push(entry);
        }
    }
    return res;
}