
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
const mockGenreList = [
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
const mockResponse = {
    "genres": mockGenreList
}

const SUT = require('./genres.controller')
const GenresService = require('../../services/movies/GenresService')


describe('List Movies Controller', ()=>{

    beforeEach(done => {
        send = sinon.spy()
        status = sinon.stub().returns({ send })
        done()
    })

    afterEach((done) => {
        if(typeof GenresService.getGenres.restore === 'function'){
            GenresService.getGenres.restore()
        }
        done()
    })

    it('It returns a 200 response when everything goes fine', (done) => {

        stub(GenresService, "getGenres").resolves({ body: mockResponse })

        try{
            SUT({}, { status, send }, (error) => {
                try{
                    expect(error).to.be.undefined()
                    expect(GenresService.getGenres.calledOnce).to.be.true()
                    expect(send.calledWith(mockGenreList)).to.be.true()
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
        stub(GenresService, "getGenres").rejects(mockError)

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