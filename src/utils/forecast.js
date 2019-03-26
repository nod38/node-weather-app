const request = require('request');

const forceast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1e86c0ea342fa054430e7745f39b01b7/' + latitude + ',' + longitude + '?units=si';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Ne mog se konektujem buraz', undefined)
        } else if (response.body.error) {
            callback('Greska u pozivu APIaja !!!', undefined)

        } else {
            callback(undefined, {forecast: response.body.hourly.summary});
        }
    })
}

module.exports = forceast;