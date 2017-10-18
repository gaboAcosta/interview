

const agent = require('superagent')

class GenresService {

    constructor(){
        this.url = 'https://api.themoviedb.org/3/genre/movie/list'
        this.apiKey = 'cfc16c6c5388df89920b44884a742197'
    }

    getGenres(){
        return agent.get(`${this.url}`)
            .query({
                api_key: this.apiKey
            })
    }
}

module.exports = new GenresService