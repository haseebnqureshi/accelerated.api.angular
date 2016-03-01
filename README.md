
## Usage
This module takes a very vanilla, bare-boned AngularJS app and rSync's it right into your project. It installs all of your necessary bower requirements, too.

Once you include ```accelerated.api.angular``` into your project dependencies and ```npm install``` your project (thereby installing this module), you'll want to include the module like this:

```

var app = require('accelerated.api');

var angular = require('acceleratd.api.angular');

app.useMiddlewares([ 
	[angular.key, angular.middleware]
]);

app.useRoutes([
	[angular.key, angular.route]
]);

app.run();

```

## Quick Start
This repo is an easy-to-use npm template to create modules for accelerated.api. Simply clone this repo and:

1. Change your ```moduleKey``` and ```moduleName``` in index.js. (```moduleKey``` is a key that uniquely identies your module in the context of your app.)

2. Update your ```package.json``` with your information and module information.

3. Now actually create your module by utilizing the three CommonJS modules in this repo, ```middleware```, ```model```, and ```route```. Please note the structure and direct injected variables in each CommonJS module and what each is returning.

4. Run ```npm publish``` in your command line to publish directly onto npm, and viola! You've got a npm packaged module for accelerated.api.

## Using in accelerated.api
Okay, so how do you use this module in your accelerated.api project? Here's an example:

```

var api = require('accelerated.api');

var example = require('acceleratd.api.module');

api.useMiddlewares([ 
	[example.key, example.middleware]
]);

api.useModels([
	[example.key, example.model]
]);

api.useRoutes([
	[example.key, example.route]
]);

api.run();

```
