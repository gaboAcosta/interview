
const Code = require('code')
const Lab = require('lab')
const proxyquire = require('proxyquire')

const lab = exports.lab = Lab.script()
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const describe = lab.describe
const it = lab.it
const expect = Code.expect
const sinon = require('sinon')
const { stub } = sinon

const UserModel = require('../../models/User')
let mockUserList = [{ name: 'test' }]
let status
let send
let mockRequest = {}

const SUT = require('./list.controller')

describe('List User Controller', ()=>{

    beforeEach((done) => {
        send = sinon.spy()
        status = sinon.stub().returns({ send })
        done()
    })

    afterEach((done) => {
        if(typeof UserModel.find.restore === 'function'){
            UserModel.find.restore()
        }
        done()
    })

    it('It returns a 200 response when everything goes fine', (done) => {

        const mockFind = {
            exec: () => Promise.resolve(mockUserList)
        }

        stub(UserModel, 'find').returns(mockFind)

        const callback = (error) => {

            expect(error).to.be.undefined()
            expect(UserModel.find.calledWith({})).to.be.true()
            expect(send.calledWith({ mockUserList  })).to.be.true()
            expect(status.calledWith(200)).to.be.true()

            done()
        }

        SUT(mockRequest, { send, status }, callback)
    });

    it('It returns a 500 response when something goes wrong', (done) => {

        const error = { message: 'Something went wrong!' }
        const mockFind = {
            exec: () => Promise.reject(error)
        }

        stub(UserModel, 'find').returns(mockFind)

        const callback = (error) => {
            try{
                expect(UserModel.find.calledWith({})).to.be.true()
                expect(send.calledWith({ error: error.message })).to.be.true()
                expect(status.calledWith(500)).to.be.true()

                done()
            } catch (ex) {
                done(ex)
            }
        }

        SUT(mockRequest, { send, status}, callback)
    });

})