/**
 * @param {Function} func
 * @param {number} wait
 */
function debounce(func, wait) {
    let timer = null;
    return function (args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, [...args]), wait);
    }
}




// debounce() with leading & trailing option
// leading: whether to invoke right away
// trailing: whether to invoke after the delay.
function debounceEnhanced(func, wait, option = { leading: false, trailing: true }) {
    let timer = null;

    return function (args) {
        if (!timer && option.leading) {
            func.apply(this, [...args]);
            timer = setTimeout(() => clearTimeout(timer), wait);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                if (option.trailing) func.apply(this, [...args]);
                timer = null;
            }, wait);
        }
    }
}