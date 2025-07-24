const RouteRegistry = require('@routes/RouteRegistry');
const ErrorRegistry = require('@exceptions/ErrorRegistry');

class Registry {
    routes(app) {
        RouteRegistry.forEach(route => {
            app.use(route.path, route.handler);
        });
    }

    errors(app) {
        ErrorRegistry.forEach(error => {
            app.use(error);
        });
    }
}

module.exports = new Registry;