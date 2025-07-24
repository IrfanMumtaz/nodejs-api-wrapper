const apiRouter = require('@routes/api');
const webRouter = require('@routes/web');

class RouteRegistry {
    constructor() {
        return this.register()
    }

    register() {
        return [
            {
                path: '/',
                handler: webRouter
            },
            {
                path: '/api',
                handler: apiRouter
            }
        ];
    }
}

module.exports = new RouteRegistry();