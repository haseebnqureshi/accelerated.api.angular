#!/bin/bash

# ensuring bower is installed
sudo npm install bower -g

# copying necessary bower files into www directory in project directory
rsync -avPI www ../..

# then bower install www in project directory
cd ../../www
sudo bower install --allow-root --verbose
