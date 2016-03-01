(function() {

	/*
	Service accAuthAjax
	*/

	window.app.factory('accAuthAjax', ['$location', '$timeout', 'accAuth', function($location, $timeout, accAuth) {
		
		var that = this;

		var ajax = {
			headers: function() {
				var headers = null;
				var requestHeader = accAuth.getAuth('requestHeader');
				if (requestHeader) {
					headers = {};
					headers[requestHeader.key] = requestHeader.value;
				}
				return headers;
			},

			run: function(method, resource, data, success, error, done) {
				var args = {
					method: method,
					url: window.API_ENDPOINT + resource,
					dataType: 'json',
					contentType: window.API_CONTENT_TYPE,
					data: JSON.stringify(data || {}),
					headers: this.headers(),
					success: function(data, textStatus, xhr) {
						if (success) { success(data, textStatus, xhr); }
						if (done) { done(xhr, data); }
					},
					error: function(xhr) {
						switch (xhr.status) {
							case 401:
								$timeout(function() {
									$location.path('/login');
								}, 1000);
							break;
						}
						if (error) { error(xhr); }
						if (done) { done(xhr); }
					}
				};
				$.ajax(args);
			}	
		};

		this.get = function(resource, success, error, done) {
			ajax.run('GET', resource, null, success || null, error || null, done || null);
		};

		this.post = function(resource, data, success, error, done) {
			ajax.run('POST', resource, data || null, success || null, error || null, done || null);
		};

		this.put = function(resource, data, success, error, done) {
			ajax.run('PUT', resource, data || null, success || null, error || null, done || null);
		};

		this.delete = function(resource, success, error, done) {
			ajax.run('DELETE', resource, null, success || null, error || null, done || null);
		};

		return this;

	}]);

})();