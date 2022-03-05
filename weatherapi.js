const got = require('got');
const dotenv = require('dotenv');
dotenv.config();

class Weather {
  constructor() {
    this.api = `${process.env.API_KEY}`
  }
  
  fetchWeatherData(city, callback) {
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${this.api}`;
    let weatherData = null;
    got(apiUrl).then((response) => {
      weatherData = JSON.parse(response.body);
      callback(weatherData.main.temp);
    });
  }
};
    
module.exports = Weather;




