'use strict';

const helpers = {

    // return parent or child in array format
    getArray(obj, selector) {
        if (!obj) { return []; }
        let target = selector ? obj[selector] : obj;
        if (!target) { return []; }
        return !Array.isArray(target) ? [ target ] : target;
    }

};

module.exports = helpers;
