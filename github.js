// Need to do pm install got@11.8.3 to reoe error received of
// const got = require('got');
//             ^
// Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/xxxxx/Projects/thermostat/node_modules/got/dist/source/index.js 
// from /Users/xxxxx/Projects/thermostat/github.js not supported.
// Instead change the require of index.js in /Users/xxxxx/Projects/thermostat/github.js 
// to a dynamic import() which is available in all CommonJS modules.
//     at Object.<anonymous> (/Users/xxxxx/Projects/thermostat/github.js:1:13) {
//   code: 'ERR_REQUIRE_ESM'
// 

const got = require('got');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = `${process.env.API_KEY}`; // paste your API key here
const city = 'London';
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

let weatherData = null;

got(apiUrl).then((response) => {
  weatherData = JSON.parse(response.body);
  console.log(weatherData);
  console.log(weatherData.main.temp);
  console.log(weatherData.weather[0].main);
});

console.log('Requesting weather data');


//  Amend the original code below to convert the string data into a JavaScript object 
//  so it is formatted properly, using JSON.parse:
// const handleReceivedResponse = (response) => {
//   console.log(response.body);
// }

//  Amend the original code above would give the below 
// const handleReceivedResponse = (response) => {
//   const responseObject = JSON.parse(response.body);
//   console.log(responseObject);
// }

// got('https://api.github.com/repos/sinatra/sinatra').then(handleReceivedResponse);

// This could be written as an anonymous function:
// got('https://api.github.com/repos/sinatra/sinatra').then((response) => {
//   const responseObject = JSON.parse(response.body);
//   console.log(responseObject);
// });

// const fetchRepoInfo = (repoName, callback) => {
//   got(`https://api.github.com/repos/${repoName}`).then((response) => {
//     const responseObject = JSON.parse(response.body);
//     callback(responseObject);
//   });
// }

// // The function would then be called this way:
// fetchRepoInfo('sinatra/sinatra', (repoResponseObject) => {
//   console.log(repoResponseObject);
// });
