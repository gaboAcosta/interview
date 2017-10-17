
const agent = require('superagent')

export default class UserService {
    static fetchUsers(){
        return agent.get('/api/v1/user')
    }
}