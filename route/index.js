module.exports = function(express, app, models) {

	/*------
	Dependencies
	------------*/



	/*------
	Helpers
	------------*/



	/*------
	Routes
	------------*/

	app.get('/*', function(req, res) {
		return res.status(200).sendFile(process.env.HOME + '/' 
			+ process.env.ANGULAR_APP_PATH || 'www' + '/'
			+ process.env.ANGULAR_APP_INDEX || 'index.html');
	});

	/*------
	Returning App (ensuring app waterfalls)
	------------*/

	return app;

};