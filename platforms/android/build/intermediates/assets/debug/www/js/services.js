angular.module('myapp.services',[])
.factory('Request',function($http){

	return{
		post: function(route,data){
			return $http({method: 'POST', url: server + route, data: data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
		},
		get:function(route,params){
			return $http({method: 'GET', url: server + route, params: params});
		}
	}
});
