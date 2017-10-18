
import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Card } from 'semantic-ui-react'
import MovieCard from './card'

@inject('MoviesListStore') @observer
export default class MoviesList extends Component{

    constructor(props){
        super(props)
        this.store = new this.props.MoviesListStore()
    }

    componentDidMount(){
        this.store.fetchMovies()
    }

    render(){
        const movies = this.store.movies
        return(
            <div>
                Hello from the Movie List component!
                <div onClick={this.addMovies}>Please add some movies</div>
                <Card.Group>
                {
                    movies.map((movie, i) => {
                        const imageSource = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
                        return(
                            <span>
                                <MovieCard
                                    image={imageSource}
                                    title={movie.title}
                                    votes={movie.vote_count}
                                    release={movie.release_date}
                                />
                            </span>
                        )
                    })
                }
                </Card.Group>
            </div>
        )
    }
}