/**
 * @param {integer} from
 * @param {integer} to
 */
function* range(from, to) {
    let counter = from;
    while (counter <= to) yield counter++;
}