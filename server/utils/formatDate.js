const moment = require('moment');

module.exports = {
    formatDate(input) {
        const dateValue = new Date(input * 1000);
        return `${moment(dateValue).format('MMMM Do YYYY, h:mm:ss a')}`;
    }
};