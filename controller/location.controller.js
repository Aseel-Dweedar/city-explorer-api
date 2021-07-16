"use strict";

require("dotenv").config();
const axios = require("axios");
const Location = require("../models/Location.model");
const Cache = require("../helper/cache");
const cacheObj = new Cache();

const locationController = (req, res) => {
    const city = req.query.city;
    const requestKey = `Location-${city}`;

    if (cacheObj[requestKey] && Date.now() - cacheObj[requestKey].timeStamp < 86400000) {
        res.send(cacheObj[requestKey].data);
    } else {
        if (city) {
            axios
                .get(`https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_KEY}&city=${city}&format=json`)
                .then((axiosRes) => {
                    let newRes = new Location(axiosRes.data[0]);
                    cacheObj[requestKey] = {};
                    cacheObj[requestKey].data = newRes;
                    cacheObj[requestKey].timeStamp = Date.now();
                    res.send(newRes);
                })
                .catch((error) => {
                    res.send(error.message);
                });
        } else {
            res.send("please provide the City name");
        }
    }
};

module.exports = locationController;