const request = require('request');


const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adress + '.json?access_token=pk.eyJ1IjoiYWxleGdvcmRvbmNhciIsImEiOiJjanRrMzFrZHowNnpjNDNvaWxka2JjNWZ3In0.hJbKu0sH4VFP4iqBLcL7OA'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Nmg se povezem buraz', undefined);
        } else if (response.body.features.length === 0) {
            callback('Greska u pozivu APIaja!!!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode;