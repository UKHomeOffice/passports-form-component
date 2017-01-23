'use strict';

const Component = require('hmpo-form-component');

class Day extends Component {
    fieldSettings() {
        return {
            legend: {
                value: 'Day',
                className: 'form-label-bold'
            },
            labelClassName: 'components-day',
            formatter: 'removehyphens',
            validate: [
                'required',
                'numeric',
                'date-day'
            ]
        };
    }
}

class Month extends Component {
    fieldSettings() {
        return {
            legend: {
                value: 'Month',
                className: 'form-label-bold'
            },
            labelClassName: 'components-month',
            formatter: 'removehyphens',
            validate: [
                'required',
                'numeric',
                'date-month'
            ]
        };
    }
}

class Year extends Component {
    fieldSettings() {
        return {
            legend: {
                value: 'Year',
                className: 'form-label-bold'
            },
            labelClassName: 'components-year',
            formatter: 'removehyphens',
            validate: [
                'required',
                'numeric',
                'date-year'
            ]
        };
    }
}

module.exports = { Day, Month, Year };
