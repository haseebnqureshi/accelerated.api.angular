(function() {

	window.app = angular.module('appPublic', ['ngRoute', 'ngCookies', 'ngAnimate']);
	
	window.app.config(function($routeProvider, $locationProvider, $httpProvider) {

		//By default, we prefer using HTML5 history push states for routing pages
		$locationProvider.html5Mode(true);
		
		/* 
		Define your routes here, along with which templates are triggered
		and served by your Angular app.
		*/

		$routeProvider
			.when('/', {
				templateUrl: '/pages/home.html'
			});

		/*
		Use $httpProvider to manipulate which routes and/or requests/responses are 
		accessible. Very useful for user authentication and admin areas.
		*/

		$httpProvider.interceptors.push(['$location', function($location) {
			return {
				request: function(config) {
					switch ($location.$$path) {	

						/* 
						The following case is an example of how you can limit access to 
						admin, triggering a redirect to login.
						*/

						// case '/admin':
						// 	if (isAllowed) {
						// 		$location.path('/login');
						// 	}
						// 	return config;
						// break;
					}
					return config;
				}
			}
		}]);

	});

})();