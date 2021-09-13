const request = require('request');

module.exports = {

    getWeatherData: (url, callback) => {
        request(url, (err, response, body) => {
            console.log('Invoking API URL : ', url);
            if (err) {
                console.log('error:', error);
            } else {
                callback(null, response.body);
            }
        });
    },

    formatResponseData: (rawData) => {
        return rawData.map(data => ({
            "dt": data.dt,
            "temp": removeAttribute(data.main, "feels_like"),
            "wind": removeAttribute(data.wind, "gust")
        }));
    }
}

function removeAttribute(item, itemToRemove) {
    delete item[itemToRemove];
    return item;
}
