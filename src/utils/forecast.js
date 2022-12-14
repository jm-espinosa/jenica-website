const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=49e875b7b0a2cfcf7483276b3b00bb18&query="+ latitude +',' + longitude + "&units=f"
    
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('There is an error!', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. " + "The humidity is " + body.current.humidity + "%.")
        }
    })
}

module.exports = forecast
