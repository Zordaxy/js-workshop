function deepCopy(inObject) {
    if (!inObject || typeof inObject !== "object") return inObject;

    let outObject = Array.isArray(inObject) ? [] : {};
    for (let key in inObject) outObject[key] = deepCopy(inObject[key]);
    return outObject;
}

let originalArray = [37, 3700, { hello: "world" }]
let shallow = originalArray.slice()
let deep = deepCopy(originalArray)
originalArray[2].hello = "moon" // Will affect the original and the shallow copy

console.log("Shallow:", ...shallow) // 37 3700 Object { hello: "moon" }
console.log("Deep:", ...deep) // 37 3700 Object { hello: "world" }