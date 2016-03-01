(function() {

	/*
	Service accPaywall

	We've completely abstracted away the pains of setting up a paywall into
	this service, full with callbacks and some optional parameters.

	This is paritcularly useful if you're watching usage of any kind. You 
	can set those limits with this service, and when the service watches
	the amounts equal or pass those limits, certain parts of your app
	can lockdown until payment is tendered, or anything else that you 
	want to define.

	Be mindful when using this service. At the end of the day, it's simply
	a tool to help you accomplish what you want, and nothing's automatic.
	*/

	window.app.factory('accPaywall', ['$location', 'accAuth', function($location, accAuth) {
		var that = this;

		this.suggest = function(data) {
			if (data.customerDelinquent == 'no') { return; }
			alert('You should upgrade.');
		};

		this.warn = function(data) {
			if (data.customerDelinquent == 'no') { return; }
			alert('Careful! You should upgrade.');
		};

		this.force = function(data) {
			if (data.customerDelinquent == 'no') { return; }
			$location.path('/upgrade');
		};

		this.watchUsage = function($scope, collectionKey, actions) {
			$scope.$watchCollection(collectionKey, function(collection) {

				/* 
				Right now, this only works with not-a-customer vs. customer.
				Multiple plans are not fully implemented, but you CAN get information
				about their subscription plan, and then write conditional statements
				that adjust their usage!

				So in other words, you can conditionally restrict usage, but
				we haven't abstracted clear systems to better manage this conditionality.
				*/

				var data = {
					customerDelinquent: accAuth.getAuth('customerDelinquent'), 
					subscriptionPlan: accAuth.getAuth('subscriptionPlan') 
				};

				var count = collection.length;
				_.each(actions, function(action, actionType) {
					var start = action[0];
					var end = action[1];
					var callback = action[2];
					if (count >= start && count <= end) {
						if (that[actionType]) { that[actionType](data); }
						if (callback) { callback(data); }
					}
				});
			});
		};

		return this;
	}]);

})();