'use strict';

const _ = require('underscore');
const helpers = require('./lib/helpers');
const debug = require('debug')('hmpo:components');

class Component {

    // returns field config
    field(settings, defaults) {
        let config = defaults || this.defaults();

        // todo: attach any mixins
        // config.mixins = this.mixins();

        // extend component defaults with provided settings
        _.each(settings, (setting, name) => {
            // allow overriding (rather than extending) of default values
            if (name === 'overrides') {
                let overrides = helpers.getArray(setting);
                _.each(overrides, (attr) => {
                    delete config[attr];
                });
            } else {
                // field attributes can be one of the following types:
                if (typeof setting === 'string') { // (eg formatter, className)
                    config[name] = setting;
                } else if (typeof setting === 'function') { // (custom functions for validate, formatter)
                    config[name] = _.union(helpers.getArray(setting), helpers.getArray(config[name]));
                } else if (_.isArray(setting)) { // (eg validate, options)
                    config[name] = _.union(config[name], setting);
                } else if (typeof setting === 'object') { // (eg legend)
                    config[name] = _.extend({}, config[name], setting);
                }
            }
        });
        return config;
    }

    baseController() {
        return require('hmpo-form-wizard').Controller;
    }

    // implement to provide a form controller
    controller(Base) {
        return this.baseController();
    }

    // implement to provide default field settings
    defaults() {
        return {};
    }

    // array of custom mixins
    mixins() {
        return;
        /*
        return {
            'mixinName': {
                '/path/to/template',
                renderWith,
                options;
            },
            ...
        }
        */
    }

}

module.exports = Component;