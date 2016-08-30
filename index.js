'use strict';

const hapi = require('hapi');
const hoek = require('hoek');
const plugin = require('./plugin');

const server = new hapi.Server();

server.connection({
    port: process.env.NODE_PORT || 8080,
    host: process.env.HOSTNAME || '0.0.0.0'
});

server.register({
    register: plugin,
}, function registerPlugins(err) {
    hoek.assert(!err, err);

    server.start(function serverInit(serr) {
        hoek.assert(!serr, serr);
        console.log(`Access the server at: ${server.info.uri}`);
    });
});
