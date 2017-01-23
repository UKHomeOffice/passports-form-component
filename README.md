# passports-form-components
Base component for use with passports forms.

This is the base component class that can be used to create custom components.

See example components for usage - https://github.com/UKHomeOffice/passports-example-components.

Components should extend from the base and implement at least one of two methods:

- 'controller': provide a form controller for use at step level.
- 'defaults': provide default field settings (if providing more than one field you can instead call the fields method directly from custom methods, for example see https://github.com/UKHomeOffice/passports-example-components/blob/master/components/dates/index.js)

Example usage:
```
// index.js

const Component = require('hmpo-form-component');
const fields = require('./fields');
const fieldController = require('./controller');

class Field extends Component {

    controller(settings) {
        settings.base = settings.base || this.baseController();
        return fieldController(settings);
    }

    defaults(settings) {
        return this.field(settings, fields);
    }

}

// controller.js

module.exports = function (settings) {

    // field keys can be passed in through settings.fields
    let fields = settings.fields || {};

    return class Field extends settings.base {
        constructor(options) {
            super(options);
        }

        getValues(req, res, callback) {
            super.getValues(req, res, (err, values) => {
                debug('GetValues called, settings', settings);
                values[fields.myField] = 'MyField value set by getValues';
                callback(null, values);
            });
        }
    };

};

// fields.js
module.exports = {
    'myField': {
        legend: {
            value: 'My field'
        },
        labelClassName: 'form-label-my-component',
        validate: ['required']
    }
}

```

This component could then be implemented with:
```
const Component = require('my-component');
const component = new Component();

const steps = {
    '/page': {
        fields: ['my-field'],
        controller: component.controller({
            fields: { 'my-field' } // pass in field keys
        })
    }
};

const fields = {
    'my-field': component.field(), // use field defaults
};
```