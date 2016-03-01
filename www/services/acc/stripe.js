(function() {

	/*
	Service accStripe

	We've made a Stripe service for easy interfacing with your API, but bear in mind,
	this relies on you having server with particular endpoints.

	If you're using the npm package, accelerated.api, no worries -- we've got your
	routes and endpoints figured out.

	So just be mindful and don't use this without thinking about things first.
	*/

	window.app.factory('accStripe', ['accAuthAjax', 'accAuth', function(accAuthAjax, accAuth) {
		var that = this;
		this.customers = {};
		this.invoices = {};
		this.plans = {};

		this.getPublishableKey = function(successCallback, errorCallback, doneCallback, doneCallback) {
			accAuthAjax.get('/stripe/getPublishableKey', successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.create = function(sourceToken, successCallback, errorCallback, doneCallback) {
			accAuthAjax.post('/stripe/customer', {
				source: sourceToken,
				plan: 'acceleratedTest'
			}, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.createSource = function(sourceToken, successCallback, errorCallback, doneCallback) {
			accAuthAjax.post('/stripe/customer/createSource', {
				source: sourceToken
			}, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.createSubscription = function(planId, successCallback, errorCallback, doneCallback) {
			accAuthAjax.post('/stripe/customer/createSubscription', {
				planId: planId
			}, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.get = function(successCallback, errorCallback, doneCallback) {
			accAuthAjax.get('/stripe/customer', function(customer) {

				/* IMPORTANT: CHECKING CUSTOMER STATUS AND PERSISTING AUTH COOKIE */

				if (customer.delinquent != null) {
					accAuth.setAuth('customerDelinquent', customer.delinquent ? 'yes' : 'no');
				}
				
				if (customer.subscriptions != null) {
					if (customer.subscriptions.data[0]) {
						if (customer.subscriptions.data[0].plan) {
							accAuth.setAuth('subscriptionPlan', customer.subscriptions.data[0].plan);
						}
					}
				}
				accAuth.persistAuth();

				if (successCallback) { return successCallback(customer); }
			}, errorCallback || null, doneCallback || null);
		};

		this.customers.update = function(data, successCallback, errorCallback, doneCallback) {
			accAuthAjax.put('/stripe/customer', data, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.updateSubscription = function(subscriptionId, planId, successCallback, errorCallback, doneCallback) {
			accAuthAjax.put('/stripe/customer/updateSubscription', {
				subscriptionId: subscriptionId,
				planId: planId
			}, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.cancelSubscription = function(subscriptionId, successCallback, errorCallback, doneCallback) {
			accAuthAjax.post('/stripe/customer/cancelSubscription', {
				subscriptionId: subscriptionId
			}, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.customers.deleteCard = function(cardId, successCallback, errorCallback, doneCallback) {
			accAuthAjax.delete('/stripe/customer/deleteCard/' + cardId, successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.invoices.list = function(successCallback, errorCallback, doneCallback) {
			accAuthAjax.get('/stripe/invoices', successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.plans.list = function(successCallback, errorCallback, doneCallback) {
			accAuthAjax.get('/stripe/plans', successCallback || null, errorCallback || null, doneCallback || null);
		};

		this.createToken = function($form, successCallback, errorCallback) {
			Stripe.card.createToken($form, function(status, response) {
				if (response.error && errorCallback) { 
					return errorCallback(response.error.message); 
				}
				if (successCallback) { 
					return successCallback(response.id, response); 
				}
			});
		};

		this.setup = function(callback) {

			//Conditionally attaching stripe script
			var src = 'https://js.stripe.com/v2/';
			var scripts = document.getElementsByTagName('script');
			var stripeScript = _.findWhere(scripts, { src: src });

			//Returning out if we've found the script attached
			if (stripeScript) { 
				if (callback) { return callback(); }
				return;
			}
			
			//Otherwise, creating new script and appending
			var script = document.createElement('script');
			script.src = src;
			document.body.appendChild(script);

			//Then waiting to return callblack on load
			script.addEventListener('load', function(event) {

				that.getPublishableKey(function(data) {
				
					//Setting publishable key
					Stripe.setPublishableKey(data.key);

					if (callback) { return callback(); }

				});
			});
		};

		return this;
	}]);

})();