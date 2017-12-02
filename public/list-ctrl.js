angular.module("PatentManagerApp")
   .controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    

        function refresh(){
            $http
                .get("/api/v1/patents")
                .then(function(response) {
                    $scope.patents = response.data;
                });
            
            $scope.newPatent={
            }
        }
        
        $scope.searchPatents = function(){
            $http({
                url: "/api/v1/patents",
                params: $scope.tosearch
            })
                .then(function(response) {
                    $scope.patents = response.data;
                    
                    if(String(response.status) == '200' && response.data.length == 0){
                    
                            $scope.error = "No patents found";
                        
}

                });
            
        }
    

        $scope.deletePatent = function (idPatent){
            
            $http
                .delete("/api/v1/patents/"+idPatent)
                .then(function(response) {
                    refresh();
                });
            
        }

        refresh();

}]);