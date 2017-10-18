
const Code = require('code')
const Lab = require('lab')
const sinon = require('sinon')
const nock = require('nock')

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

const mockMovieList = {
    "page": 1,
    "total_results": 123,
    "total_pages": 23,
    "results": [
        {
            "title": "My Movie 1",
            "poster_path": "poster 1",
            "release_date": "release 1"
        },
        {
            "title": "My Movie 2",
            "poster": "poster 2",
            "release": "release 2"
        },
        {
            "title": "My Movie 3",
            "poster": "poster 3",
            "release": "release 3"
        },
    ]
}

const SUT = require('./DiscoverService')


describe('Discover Movie Service', ()=>{

    it('It calls the movie db with the right info', (done) => {

        nock('https://api.themoviedb.org')
            .get('/3/discover/movie')
            .query({
                api_key: 'cfc16c6c5388df89920b44884a742197',
                language: 'en-US'
            })
            .reply(200, mockMovieList);

        SUT.getMovies()
        .then((response) => {
            const { body } = response
            expect(body).to.equal(mockMovieList)
            done()
        })
        .catch(done)
    });

})