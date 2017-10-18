
const Code = require('code')
const Lab = require('lab')

const lab = exports.lab = Lab.script()
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const sinon = require('sinon')
const { stub } = sinon

let send
let status
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

const SUT = require('./discover.controller')
const DiscoverService = require('../../services/movies/DiscoverService')


describe('List Movies Controller', ()=>{

    beforeEach(done => {
        send = sinon.spy()
        status = sinon.stub().returns({ send })
        done()
    })

    afterEach((done) => {
        if(typeof DiscoverService.getMovies.restore === 'function'){
            DiscoverService.getMovies.restore()
        }
        done()
    })

    it('It returns a 200 response when everything goes fine', (done) => {

        stub(DiscoverService, "getMovies").resolves({ body: mockMovieList })

        try{
            SUT({}, { status, send }, (error) => {
                try{
                    expect(error).to.be.undefined()
                    expect(DiscoverService.getMovies.calledOnce).to.be.true()
                    expect(send.calledWith(mockMovieList)).to.be.true()
                    expect(status.calledWith(200)).to.be.true()
                    done()
                } catch(ex){
                    done(ex)
                }
            })
        } catch(ex){
            done(ex)
        }

    });

    it('It returns a 500 response when the service sends an error', (done) => {

        const mockError = { error: 'Internal Error' }
        stub(DiscoverService, "getMovies").rejects(mockError)

        try{
            SUT({}, { status, send }, (error) => {
                try{
                    expect(error).to.be.object()
                    expect(error).to.be.equal(mockError)
                    expect(send.calledWith(mockError)).to.be.true()
                    expect(status.calledWith(500)).to.be.true()
                    done()
                } catch(ex){
                    done(ex)
                }
            })
        } catch(ex){
            done(ex)
        }

    });

})