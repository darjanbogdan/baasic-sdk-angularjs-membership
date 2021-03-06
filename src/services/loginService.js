﻿/* globals module */
/**
 * @module baasicLoginService
 * @description Baasic Register Service provides an easy way to consume Baasic Application Registration REST API end-points. In order to obtain a needed routes `baasicLoginService` uses `baasicLoginRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicLoginService', ['baasicApiHttp', 'baasicAuthorizationService', 'baasicLoginRouteService',
        function (baasicApiHttp, authService, loginRouteService) {
            return {
                 /**
                 * Returns a promise that is resolved once the login action has been performed. This action logs user into the application and success response returns the token resource.
                 * @method        
                 * @example 
baasicLoginService.login({
  username : '<username>',
  password : '<password>',
  options : ['session', 'sliding']
})
.success(function (data) {
  // perform success actions here
})
.error(function (data, status) {
  // perform error handling here
})
.finally (function () {});       
                 **/  				
                login: function login(data) {
                    var settings = angular.copy(data);
                    var formData = 'grant_type=password&username=' + settings.username + '&password=' + settings.password;

                    if (settings.options) {
                        var options = settings.options;
                        if (angular.isArray(options)) {
                            settings.options = options.join();
                        }
                    }

                    return baasicApiHttp({
                        url: loginRouteService.login.expand(settings),
                        method: 'POST',
                        data: formData,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    })
					.success(function (data) {
						authService.updateAccessToken(data);
					});
                },
				/**
				* Returns a promise that is resolved once the loadUserData action has been performed. This action retrieves the account information of the currently logged in user. Retrieved account information will contain permission collection which identifies access policies assigned to the user and application sections.
				* @method
				* @example
baasicLoginService.loadUserData()
.success(function (data) {
  // perform success actions here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                loadUserData: function loadUserData(data) {
                    data = data || {};
                    return baasicApiHttp.get(loginRouteService.login.expand(data), { headers: { 'Accept': 'application/json; charset=UTF-8' } });
                },
				/**
				* Returns a promise that is resolved once the logout action has been performed. This action invalidates user token logging the user out of the system.
				* @method
				* @example
var token = baasicAuthorizationService.getAccessToken();
baasicLoginService.logout(token.access_token, token.token_type)
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                logout: function logout(token, type) {
                    return baasicApiHttp({
                        url: loginRouteService.login.expand({}),
                        method: 'DELETE',
                        data: {
                            token: token,
                            type: type
                        }
                    })
					.success(function () {
						authService.updateAccessToken(null);
					});
                },
                /**
                * Provides direct access to `baasicLoginRouteService`.
                * @method        
                * @example baasicLoginService.routeService.get.expand(expandObject);
                **/             
                routeService: loginRouteService
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/