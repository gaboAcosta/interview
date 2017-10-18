
const agent = require('superagent')
const Code = require('code')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const beforeEach = lab.before
const before = lab.before
const after = lab.after
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const serverFactory = require('../../../server/util/server.factory')
const DatabaseHelper = require('../../util/database.helper')

const mockUsers = [{ name: 'test' }, { name: 'test2' }]

let server

describe('List User', ()=>{

    before((done) => {
        const app = serverFactory()

        server = app.listen(3000, function () {
            console.log(('Started server!'));
            done()
        })
    })

    after((done) => {
        server.close()
        server = null
        DatabaseHelper.disConnect()
            .then(() => { done() }).catch(done)
    })

    beforeEach(() => {
        return DatabaseHelper.wipeCollections()
    })

    it('it request and returns the list of users in the db', (done) => {

        DatabaseHelper.insertToCollection('users', mockUsers)
            .then(() => {
                return agent.get('http://localhost:3000/api/v1/user')
                    .then((response) => {
                        const foundUsers = response.body
                        const users = foundUsers.map((user) => {
                            delete user['_id']
                            return user
                        })
                        expect(users).to.equal(mockUsers)
                        done()
                    })
            }).catch(done)
    });
})