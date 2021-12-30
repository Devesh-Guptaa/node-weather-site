//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d7012b008bdade587ba20920f5bf069b&query=' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to fetch data from server", undefined)
        }
        else if (response.body.error) {
            callback("Coordinates are wrong", undefined)
        }
        else {
            const Data = response.body.current.weather_descriptions[0] + " ,temeperature is " + response.body.current.temperature + " but chances of rain is " + response.body.current.precip + ' % only.'
            callback(undefined, Data)
        }
    })
}

module.exports = forecast