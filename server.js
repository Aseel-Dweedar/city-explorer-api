const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

const locationController = require("./controller/location.controller");
const weatherController = require("./controller/weather.controller");
const moviesController = require("./controller/movies.controller");
const indexController = require("./controller/index.controller");

app.use(cors());
app.use(express.json());

app.get("/", indexController);
app.get("/location", locationController);
app.get("/weather", weatherController);
app.get("/movies", moviesController);
app.listen(PORT, () => console.log(`listening ${PORT}`));