
const Code = require('code')
const Lab = require('lab')
const sinon = require('sinon')
const nock = require('nock')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const mockGenreList = {
    "genres": [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        }
    ]
}

const SUT = require('./GenresService')


describe('Discover Movie Service', ()=>{

    it('It calls the movie db with the right info', (done) => {

        nock('https://api.themoviedb.org')
            .get('/3/genre/movie/list')
            .query({
                api_key: 'cfc16c6c5388df89920b44884a742197'
            })
            .reply(200, mockGenreList);

        SUT.getGenres()
        .then((response) => {
            const { body } = response
            expect(body).to.equal(mockGenreList)
            done()
        })
        .catch(done)
    });

})