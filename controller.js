'use strict';

const Component = require('hmpo-form-component');
const debug = require('debug')('hmpo:date-component');

class Controller extends Component {

    controller(settings) {
        // allow implementations to supply their own parent - in this way, multiple components controllers could be used on a single step
        let Base = settings.base || this.baseController();
        let fields = settings.fields || {}; // field keys can be passed in through settings.fields

        return class DateController extends Base {
            constructor(options) {
                super(options);
            }

            getValues(req, res, callback) {
                super.getValues(req, res, (err, values) => {
                    debug('GetValues called, settings', settings);
                    values[fields.d] = 'Day value set by getValues';
                    callback(null, values);
                });
            }
        };
    }
}

module.exports = Controller;