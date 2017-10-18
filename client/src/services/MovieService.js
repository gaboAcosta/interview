
import React from 'react'
import agent from 'superagent'


class MovieService {

    constructor(){
        this.url = 'http://localhost:8080/api/v1/movies'
    }

    fetchMovies(){
        return agent.get(`${this.url}`)
    }
}

export default new MovieService()