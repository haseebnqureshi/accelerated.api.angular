(function() {

	/*
	Service accItems
	*/

	window.app.factory('accItems', ['accAuthAjax', function(ajax) {

		var that = this;

		this.getAll = function(success, error, done) {
			ajax.get('/' + window.API_RESOURCE_ITEMS, 
				success || null, 
				error || null, 
				done || null
			);
		};

		this.post = function(data, success, error, done) {
			ajax.post('/' + window.API_RESOURCE_ITEMS, 
				data, 
				success || null, 
				error || null, 
				done || null
			);
		};

		this.get = function(id, success, error, done) {
			ajax.get('/' + window.API_RESOURCE_ITEMS + '/' + id, 
				success || null, 
				error || null, 
				done || null
			);
		};

		this.put = function(id, data, success, error, done) {
			ajax.put('/' + window.API_RESOURCE_ITEMS + '/' + id,
				data, 
				success || null, 
				error || null, 
				done || null
			);
		};

		this.delete = function(id, success, error, done) {
			ajax.delete('/' + window.API_RESOURCE_ITEMS + '/' + id, 
				success || null, 
				error || null, 
				done || null
			);
		};

		return this;	
			
	}]);

})();