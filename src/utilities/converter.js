export function formatEmpty(value) {
    if (value) {
        return value;
    } else {
        return "-";
    }
}

export function keyPairStrToArray(obj) {
    var jsonObj = JSON.parse(obj);
    return Object.keys(jsonObj).map(
        (key) => ({
            id: key,
            text: jsonObj[key],
        })
    );
}