const request = require('request')

const geoLocation = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2ZXNoLWd1cHRhIiwiYSI6ImNreG15YTJoejFpdTcycnFrMW9zMTk4c3QifQ.tKGmbL-YR_IJjPMCEW6FHA&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect to location server!", undefined)
        }
        else if (response.body.features.length === 0) {
            callback("invalid address", undefined)
        }
        else {
            const data = {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            }
            console.log("Everything is Good!!")
            callback(undefined, data)
        }
    })
}

module.exports = geoLocation
