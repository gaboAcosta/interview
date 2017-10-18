
import { observable, action } from 'mobx'
import MoviesService from '../../services/MovieService'

export default class MovieList {
    @observable movies = []

    @action
    fetchMovies(){
        MoviesService.fetchMovies()
            .then(({ body }) => {
                this.movies = body.results
            })
    }

}