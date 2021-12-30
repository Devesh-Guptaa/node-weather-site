const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoLocation = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partilasPath = path.join(__dirname, '../templates/partials')
const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partilasPath)

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Devesh Gupta"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Devesh Gupta"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: "Devesh Gupta"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("Please enter Location")
    }

    geoLocation(req.query.address, (error, response) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(response.latitude, response.longitude, (error, data) => {
            if (error) {
                return res.send("Unable to get data for such location")
            }
            res.send({
                forecast: data,
                location: response.location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: "Page 404 not found",
        name: "Devesh Gupta",
        errorMessage: "Unable to find more info on Help Page"
    })
})

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: "Page 404 not found!!",
        name: "Devesh Gupta",
        errorMessage: "Page not found"
    })
})




app.listen(port, () => {
    console.log("Started port at port " + port)
})