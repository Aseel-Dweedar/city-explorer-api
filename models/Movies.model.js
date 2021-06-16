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

module.exports = Movies;