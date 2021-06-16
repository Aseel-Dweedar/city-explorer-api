const axios = require("axios");
require("dotenv").config();

const Movies = require("../models/Movies.model");
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const moviesController = (req, res) => {
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
};

module.exports = moviesController;