const express = require("express");
const app = express();

const { response } = require("express");
const { load } = require("dotenv");

const weatherController = require("./controller/weather.controller");
const moviesController = require("./controller/movies.controller");
const indexController = require("./controller/index.controller");

require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");

app.use(cors());
app.get("/", indexController);
app.get("/weather", weatherController);
app.get("/movies", moviesController);
app.listen(PORT, () => console.log(`listening ${PORT}`));