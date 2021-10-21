// Utils
var _ = require('lodash');

const keyExists = (obj, key) => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
        return false;
    }
    else if (obj.hasOwnProperty(key)) {
        return true;
    }
    else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const result = keyExists(obj[i], key);
            if (result) {
                return result;
            }
        }
    }
    else {
        for (const k in obj) {
            const result = keyExists(obj[k], key);
            if (result) {
                return result;
            }
        }
    }

    return false;
};

const nestedObject = (obj, key) => {
    if (!obj || (typeof obj !== "object" && !Array.isArray(obj))) {
        return null;
    }
    else if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            const result = nestedObject(obj[i], key);
            if (result) {
                return result;
            }
        }
    }
    else {
        for (const k in obj) {
            const result = nestedObject(obj[k], key);
            if (result) {
                return result;
            }
        }
    }

    return null;
};

const compareStates = (customStatus, stateData) => {
    var keys = Object.keys(customStatus);
    if (!keys.length) return false;

    var firstKey = keys[0];
    var customObject = nestedObject(customStatus, firstKey);
    var stateObject = nestedObject(stateData, firstKey);

    return _.isEqual(customObject, stateObject);
}

exports.nestedObject = nestedObject;
exports.keyExists = keyExists;
exports.compareStates = compareStates;
