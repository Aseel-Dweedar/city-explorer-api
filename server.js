const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
// const weatherData = require("./data/weather.json");
require("dotenv").config();
const PORT = process.env.PORT;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const cors = require("cors");
const axios = require("axios");

app.use(cors()); // after you initialize your express app instance

// a server endpoint
app.get(
    "/", // our endpoint name
    function(req, res) {
        // callback function of what we should do with our request
        res.send("Hello World"); // our endpoint function response
    }
);

app.get("/weather", (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    if (lat && lon) {
        const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`;
        axios
            .get(weatherBitUrl)
            .then((response) => {
                const responseData = response.data.data.map((obj) => new Weather(obj));
                res.json(responseData);
            })
            .catch((error) => {
                res.send(error.message);
            });
    } else {
        res.send("please provide the proper lat and lon");
    }
});

class Weather {
    constructor(weatherData) {
        this.description = weatherData.weather.description;
        this.date = weatherData.valid_date;
    }
}

app.get("/movies", (req, res) => {
    const city = req.query.city;
    if (city) {
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
        axios
            .get(moviesUrl)
            .then((response) => {
                console.log(response);
                const responseData = response.data.results.map((movie) => new Movies(movie));
                res.json(responseData);
            })
            .catch((error) => {
                res.send(error.message);
            });
    } else {
        res.send("please provide the City name");
    }
});

class Movies {
    constructor(moviesData) {
        this.title = moviesData.title;
        this.overview = moviesData.overview;
        this.average_vote = moviesData.vote_average;
        this.total_votes = moviesData.vote_count;
        this.image_url = moviesData.poster_path;
        this.popularity = moviesData.popularity;
        this.released_on = moviesData.release_date;
    }
}

app.listen(PORT, () => console.log(`listening ${PORT}`)); // kick start the express server to work