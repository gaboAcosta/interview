

const agent = require('superagent')

class DiscoverService {

    constructor(){
        this.url = 'https://api.themoviedb.org/3/discover/movie'
        this.apiKey = 'cfc16c6c5388df89920b44884a742197'
        this.language = 'en-US'
    }

    getMovies(){
        return agent.get(`${this.url}`)
            .query({
                api_key: this.apiKey,
                language: this.language
            })
    }
}

module.exports = new DiscoverService