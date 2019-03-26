const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars and views path
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//Static dir
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Marko'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'ABOUT',
        name: 'Marko'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'HELP',
        name: 'Marko'
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        error: 'Nema Helpa ovde',
        name: 'Marko',
        title: '404'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.adress){
        return res.send({
            error: 'U must enter the adress'
        })
    }
    geocode(req.query.adress, (error, data) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) =>{
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData.forecast,
                location: data.location,
                adress: req.query.adress
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Beograd',
    //     adress: req.query.adress
    // })
})

app.get('*', (req, res) =>{
    res.render('404', {
        error: 'Ova brate ne postoji',
        name: 'Marko',
        title: '404'
    })
})

app.listen(port, () =>{
    console.log('Startovan server buraz na portu: ' + port)
})