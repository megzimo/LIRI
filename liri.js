/*
//////////////////////////////////////// LIRI COMMANDS ////////////////////////////////////////
Bands in Town - concert-this
Spotify - spotify-this-song
OMDb - movie-this
Twitter - do-what-it-says 
*/

require('dotenv').config();

let request = require('request');
let inquirer = require('inquirer');
let Spotify = require('node-spotify-api');

let header = "~*~*~*~*~*~*~*~*~*~*~ Your Results ~*~*~*~*~*~*~*~*~*~*~";


//////////////////////////////////////// OMDB Movie Request ////////////////////////////////////////
let request = require("request");
let movie = process.argv[2];
queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

request(queryURL, function (error, response, body) {
    if(!error && response.statusCode === 200) {
        let json = JSON.parse(body);

        console.log("The movie plot is: " + json.Plot)
    }
})

//////////////////////////////////////// Next Section ////////////////////////////////////////


//////////////////////////////////////// Next Section ////////////////////////////////////////


//////////////////////////////////////// Next Section ////////////////////////////////////////


//////////////////////////////////////// Next Section ////////////////////////////////////////