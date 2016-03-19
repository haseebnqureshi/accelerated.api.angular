
## Usage
This module takes a very vanilla, bare-boned AngularJS app and rSync's it right into your project. It installs all of your necessary bower requirements, too.

Once you include ```accelerated.api.angular``` into your project dependencies and ```npm install``` your project (thereby installing this module), you'll want to include the module like this:

```

var app = require('accelerated.api');

var angular = require('acceleratd.api.angular').use();

app.useMiddlewares([ 
	[angular.key, angular.middleware]
]);

app.useRoutes([
	[angular.key, angular.route]
]);

app.run();

```
