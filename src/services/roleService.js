﻿/**
 * @module baasicRoleService
**/

/** 
 * @overview Role service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicRoleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicRoleRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, roleRouteService) {
            return {
                routeService: roleRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of role resources.
                 * @method        
                 * @example 
baasicRoleService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "name",
  orderDirection : "desc",
  search : "searchTerm"
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (options) {
                    return baasicApiHttp.get(roleRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the role resource.
                 * @method        
                 * @example 
baasicRoleService.get("uniqueID")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(roleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create action has been performed. Success response returns the requested role resource.
                 * @method        
                 * @example 
baasicRoleService.create({
  description : "role description",
  name : "role name"
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
                    return baasicApiHttp.post(roleRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update role action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.name = "updated role name";
baasicRoleService.update(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});

				**/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove role action has been performed. If the action is successfully completed the resource is permanently removed from the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicRoleService.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/				
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
}(angular, module));