/*
Easy place to load in global variables, while keeping high
visibility into your angular app.
*/

window.ANGULAR_AUTH_COOKIE_NAME = 'accelerated-auth';
window.ANGULAR_AUTH_COOKIE_DURATION = 1000 * 60 * 60 * 24 * 365; //1 year
window.API_ENDPOINT = 'http://192.168.80.200:8080/v1/';
window.API_CONTENT_TYPE = 'application/json';
window.API_RESOURCE_REGISTER = 'register';
window.API_RESOURCE_LOGIN = 'login';
window.API_RESOURCE_USER = 'user';
window.API_RESOURCE_ITEMS = 'items';

