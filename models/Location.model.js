"use strict";

class Location {
    constructor(locationData) {
        this.display_name = locationData.display_name;
        this.lat = locationData.lat;
        this.lon = locationData.lon;
        this.img = `https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATION_KEY}&center=${this.lat},${this.lon}&zoom=15`;
    }
}

module.exports = Location;