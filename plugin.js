const inert = require('inert');
const hoek = require('hoek');

function plugin(server, options, next) {
    server.register(inert, {
        once: true
    }, function registerPlugins(err) {
        hoek.assert(!err, err);

        server.route({
            method: 'GET',
            path: '/statics/{file*}',
            handler: function handleRequest(request, reply) {
                return reply.file(`statics/${request.params.file}`);
            }
        });

        next();
    });
}

module.exports.register = plugin;

module.exports.register.attributes = {
    name: 'genericStaticFileHandlerPlugin',
    version: '1.0.0'
};
