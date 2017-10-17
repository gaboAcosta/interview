import { observable, computed, action } from 'mobx'
import UserService from '../../services/UserService'

export default class UsersListModel {
    @observable users = [];

    @action
    fetchUsers() {
        return UserService.fetchUsers()
            .then((response) => {
                const users = response.body
                this.users = users
            })
    }
}