(function() {

	/*
	Service accAuth
	*/

	window.app.factory('accAuth', ['$cookies', function($cookies) {
		var that = this;

		this.cookieKey = window.ANGULAR_AUTH_COOKIE_NAME;
		this.cookie = null;
		this.isAllowed = false;
		this.wasFrisked = false;
		this.wasScanned = false;

		this.expiration = function() {
			var now = new Date().getTime();
			var future = now + window.ANGULAR_AUTH_COOKIE_DURATION;
			var expiration = new Date(future);
			return expiration;
		};

		this.getAuth = function(property) {
			if (!this.cookie) { return null; }
			if (!this.cookie[property]) { return undefined; }
			return this.cookie[property];
		};

		this.setAuth = function(property, value) {
			if (!this.cookie) { return null; }
			this.cookie[property] = value;
		};

		this.screen = function(callback) {

			//skip logic if our cookie exists
			if (this.cookie && callback) { 
				that.isAllowed = true;
				that.wasFrisked = false;
				that.wasScanned = false;
				return callback(that.isAllowed, that.wasFrisked, that.wasScanned); 
			}

			this.cookie = $cookies.getObject(this.cookieKey);
			that.isAllowed = false;
			that.wasScanned = false;

			//frisking for cookie
			if (_.has(this.cookie, 'requestHeader')) {
				if (_.has(this.cookie.requestHeader, 'value')) {
					if (this.cookie.requestHeader.value.length == 40) {
						that.isAllowed = true;
					}
				}
			}
			that.wasFrisked = true;

			if (callback) { callback(that.isAllowed, that.wasFrisked, that.wasScanned); }
		};

		this.persistAuth = function() {
			$cookies.putObject(that.cookieKey, that.cookie, { expires: that.expiration() });
		};

		this.login = function(data, success, notFound, error) {
			$.ajax({
				method: 'POST',
				url: window.API_ENDPOINT + '/' + window.API_RESOURCE_LOGIN,
				dataType: 'json',
				data: {
					email: data.email,
					password: data.password
				},
				success: function(data, textStatus, xhr) {
					that.cookie = {
						requestHeader: {
							key: data.header,
							value: data.value
						}
					};
					$cookies.putObject(that.cookieKey, that.cookie, { expires: that.expiration() });
					if (success) { success(data); }
				},
				error: function(xhr) {
					switch (xhr.status) {
						case 404:
							$cookies.remove(that.cookie);
							if (notFound) { notFound(xhr); }
						break;
						default:
							if (error) { error(xhr); }
					}
				}
			});
		};

		this.logout = function(callback) {
			$cookies.remove(that.cookieKey);
			if (callback) { callback(); }
		};	

		this.register = function(data, success, alreadyEmail, error) {
			$.ajax({
				method: 'POST',
				url: window.API_ENDPOINT + '/' + window.API_RESOURCE_REGISTER,
				dataType: 'json',
				data: {
					email: data.email,
					password: data.password,
					firstName: data.firstName,
					lastName: data.lastName
				},
				success: function(resData, textStatus, xhr) {
					that.login(data, success || null);
				},
				error: function(xhr) {
					switch (xhr.status) {
						case 400:
							if (alreadyEmail) { alreadyEmail(xhr); }
						break;
						default:
							if (error) { error(xhr); }
					}
				}
			});
		};

		return this;
	}]);

})();