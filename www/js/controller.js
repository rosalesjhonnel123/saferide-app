//var server = "http://localhost/api/";
var server = "http://web.proweaverlinks.com/tech/mobileappapiserver/"; // api link provide		`QW2	`
var route = '';
var params = {};
var data = {};
angular.module('myapp.controller',[])
.controller('IndexCtrl',function($scope,$ionicModal,$ionicLoading,$http,Request){
	$scope.users = {};
	route = 'users';
	$ionicLoading.show({template: 'Loading...',showBackdrop:true});
	Request.get(route,params).success(function(result){
		$scope.users = result;
		$ionicLoading.hide();
	});

	$scope.doRefresh = function() {    
    	Request.get(route,params).success(function(result){
		$scope.users = result;
		}).finally(function(){
			$scope.$broadcast('scroll.refreshComplete');
		});
  	}

    $ionicModal.fromTemplateUrl('templates/insertuser.html', {
	    scope: $scope,
	    animation: 'slide-in-up',
	    focusFirstInput: true
	}).then(function(modal) {
	    $scope.insertmodal = modal;
    });
	

	$scope.UpdateModal = function(id,index){
      
      $ionicModal.fromTemplateUrl('templates/updateUser.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
      
        $scope.updatemodal = modal;
        $scope.updatemodal.show();
        route = 'users';
        params = {'id':id, 'action': 'getrow'};

   		Request.get(route,params).success(function(result){
			$scope.info = result;
			$scope.index = index;
			//console.log(result);
		});
      });
    }    

    $scope.confirm = function(id,index){
      
      $ionicModal.fromTemplateUrl('templates/confirm.html', {
        scope: $scope,
        animation: 'slide-in-up',
        focusFirstInput: true
      }).then(function(modal) {
        
       
        $scope.deletemodal = modal;
        $scope.deletemodal.show();
        $scope.id = id;
        $scope.index = index;
      });
    }   
    
    $scope.like = function(id,val,index){
        
        route = 'users?action=updaterow&id='+ id;

  		$scope.users[index].likes = parseInt(val) + 1; 
 		data = [{'likes':$scope.users[index].likes}];      
	    Request.post(route,data).success(function(result){
	    	console.log(result);
	    });

    }

    $scope.dislike = function(id,val,index){
    	route = 'users?action=updaterow&id='+ id;
  		$scope.users[index].dislikes = parseInt(val) + 1; 
 		data = [{'dislikes':$scope.users[index].dislikes}];      
	    Request.post(route,data).success(function(result){
	    	console.log(result);
	    });
    	
    }
})
.controller('UsersCtrl',function($scope,$http,$ionicLoading,Request){

  	$scope.deleteuser = function(id,index){
    	$ionicLoading.show({template: 'Loading...',showBackdrop:true});  
    	route = 'users?action=deleterow&id='+ id;
    	Request.post(route,data).success(function(result){
	    	alert('User was successfully deleted');
	    	$ionicLoading.hide();
	    	$scope.deletemodal.hide();
	    	console.log(index);
	    	$scope.users.splice(index,1);
	    });

  	}
	$scope.createuser = function(form){
		if(form.$valid){
		    route = 'users?action=insertrow';
		    $ionicLoading.show({template: 'Loading...',showBackdrop:true});
		        
     		data = [{'fname': $scope.firstName, 'lname': $scope.lastName, 'email': $scope.email, 'address': $scope.address, 'phone': $scope.phone,'likes': 0,'dislikes':0, 'motto': $scope.motto, 'avatar': $scope.avatar}];      

		    Request.post(route,data).success(function(result){
		    	var userinfo = data[0];
		        userinfo["id"] = result;
		        $scope.insertmodal.hide();
		        $scope.users.unshift(userinfo);
		        console.log($scope.users);
		        $ionicLoading.hide();
		    });
		}
	}

	$scope.updateuser = function(form,index){

		if(form.$valid){
		    route = 'users?action=updaterow&id='+ $scope.info.id;
		    $ionicLoading.show({template: 'Loading...',showBackdrop:true});    
     		data = [{'fname': $scope.info.fname, 'lname': $scope.info.lname, 'email': $scope.info.email, 'address': $scope.info.address, 'phone': $scope.info.phone, 'motto': $scope.info.motto, 'avatar': $scope.avatar,'likes':$scope.info.likes,'dislikes':$scope.info.dislikes}];      

		    Request.post(route,data).success(function(data){
		    	alert('User was successfully updated');
		    	$ionicLoading.hide();
		    	$scope.updatemodal.hide();
		    	$scope.users[$scope.index] = data;
		    });
		}
	}

	$scope.close = function(modal){
		$scope.modal = modal;
   	 	$scope.modal.hide();
  	}
});