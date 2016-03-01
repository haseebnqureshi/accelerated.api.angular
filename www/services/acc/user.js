(function() {

	/*
	Service accUser
	*/

	window.app.factory('accUser', ['accAuthAjax', 'accAuth', function(ajax, accAuth) {

		var that = this;

		this.get = function(success, error, done) {
			ajax.get('/' + window.API_RESOURCE_USER, 
				function(user) {

					//IMPORTANT: GETTING USER INFORMATION AND STORING
					if (user != null) {
						accAuth.setAuth('user', user);
					}
					accAuth.persistAuth();

					if (success) { success(user); }
				}, 
				error || null, 
				done || null
			);
		};

		this.put = function(data, success, error, done) {
			ajax.put('/' + window.API_RESOURCE_USER, 
				data, 
				success || null, 
				error || null, 
				done || null
			);
		};

		return this;

	}]);

})();