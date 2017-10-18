
import UsersListStore from './users/list'
import MoviesListStore from './movies/list'

const GetStores = () => {
    return {
        UsersListStore,
        MoviesListStore,
    }
}

export default GetStores