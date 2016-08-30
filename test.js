'use strict';

const chai = require('chai');
const expect = chai.expect;
const plugin = require('./plugin');
const hoek = require('hoek');
const hapi = require('hapi');

describe('static file handler', function() {
    let server;

    beforeEach(function() {
        server = new hapi.Server();
        server.connection();
        server.register({
            register: plugin
        }, function handleRegister(err) {
            hoek.assert(!err, err);
        });
    });

    afterEach(function() {
        server = null;
    });

    describe('#register()', function() {
        it('should return 200', function() {
            return server.inject({
                method: 'GET',
                url: '/statics/example.json'
            }).then(function(response) {
                expect(response.statusCode).to.equal(200);
            });
        });

        it('should return 404', function() {
            return server.inject({
                method: 'GET',
                url: '/statics/not-found.json'
            }).then(function(response) {
                expect(response.statusCode).to.equal(404);
            });
        });
    });
});
