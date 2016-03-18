module.exports = (function() {

    // you can require this or other modules using accelerated.api.module 
    var module = require('accelerated.api.module');
    
    // set your module's key for reference by middlwares, models, and routes 
    module.setKey('angular');

    // set your module's name for logging output 
    module.setName('Angular Module');

    // you can choose to extend your module's middleware 
    module.appendMiddleware(function(express, app, models) {

		app.use('/', express.static(process.env.ANGULAR_APP_PATH || 'www'));

        // modify app to include user authentication middleware 
        return app;

    });

    // you can choose to extend your module's routes
    module.appendRoute(function(express, app, models) {

		app.get('/*', function(req, res) {
			return res.status(200).sendFile(process.env.HOME + '/' 
				+ process.env.ANGULAR_APP_PATH || 'www' + '/'
				+ process.env.ANGULAR_APP_INDEX || 'index.html');
		});

        // modify app to include user CRUD routes 
        return app;

    });

    return module;

})();