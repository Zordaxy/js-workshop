
function all(promises) {
    if (!promises || !promises.length) return Promise.resolve([]);

    return new Promise((resolve, reject) => {
        let result = [];
        promises.forEach((pr, i) => {
            Promise.resolve(pr).then(val => {
                result[i] = val;
                if (result.length === promises.length) resolve(result);
            }).catch(error => reject(error));
        });
    });
}

all([1, 2, 3, Promise.resolve(4)]).then(x => console.log(x)); // [ 1, 2, 3, 4 ]
all([1, 2, 3, Promise.reject('error')]).catch(x => console.log(x)); // error