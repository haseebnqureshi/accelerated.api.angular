module.exports = function(express, app, models) {

	/*------
	Dependencies
	------------*/



	/*------
	Helpers
	------------*/



	/*------
	Middleware
	------------*/

	app.use('/', express.static(process.env.ANGULAR_APP_PATH || 'www'));

	/*------
	Returning App (ensuring app waterfalls)
	------------*/

	return app;

};