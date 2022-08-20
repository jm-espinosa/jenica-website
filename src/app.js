const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

//Define Path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather website',
        name: 'Jenica'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        name: 'Jenica'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Jenica'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You should provide an address!'
        })
    }

        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if(error){
                    return res.send({
                        error
                    })
                }
        
                res.send({
                    location: location,
                    forecast: forecastData,
                    address: req.query.address
                })
            })
        })
    }
    // res.send({
    //     forecast: 'Scattered Thunderstorms',
    //     location: 'Lipa City',
    //     address: req.query.address
    // })
)

app.get('/sample', (req, res)=>{
    res.send({
        sample: 'This is a sample page'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        errorMessage: 'Specific Help Page not found!',
        name: 'Jenica'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        errorMessage: '404 not found!',
        name: 'Jenica'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})