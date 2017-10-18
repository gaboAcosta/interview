
import React from 'react';
import nock from 'nock'

import UserService from './UserService';

const mockUsers = [{name: 'test'}]

describe('UserService', function() {
    it('should request the backend and return user', function() {

        nock('http://localhost')
            .get('/api/v1/users')
            .reply(200, mockUsers);

        UserService.fetchUsers().then((users) => {
            expect(users).to.equal(mockUsers)
        })
    });
});