angular.module("PatentManagerApp")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {


        function refresh() {
            $http
                .get("/api/v1/patents")
                .then(function(response) {
                    $scope.data = response.data;
                    
                    var years = [];
                // Recorremos las patentes para sacar los años    
                for(var i in $scope.data) {
                        var year = $scope.data[i].date.split("-")[0];
                        var yearNumber = Number(year);
                        years.push(yearNumber);
                }
                // Ordenamos el array para coger el minimo y maximo
                var yearsSort = years.sort();
                
                var startYear= yearsSort[0];
                var finishYear = yearsSort[yearsSort.length - 1];
                
                var consecutiveYears=[];
                //Generamos los años que queremos que tenga nuestro diagrama de barras
                for(i = startYear ;i <= finishYear; i++) {
                    
                    consecutiveYears.push(String(i));
                }
                //Generamos el numero de patentes para cada año
                var patentsValuePerYear = [];
                var numPatentsPerYear = 0;
                
                var cont = startYear;
                while (cont <= finishYear) {
                    
                    for(var i in $scope.data) {
                        var year = $scope.data[i].date.split("-")[0];
                        var yearNumber = Number(year);
                        if(cont == yearNumber){
                            numPatentsPerYear = numPatentsPerYear +1;
                        }
                    }
                    patentsValuePerYear.push(numPatentsPerYear);
                    numPatentsPerYear = 0;
                    cont++;
                    
                }
                    
                    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Patents per year'
    },
    subtitle: {
        text: 'Source: Patents'
    },
    xAxis: {
        categories: consecutiveYears,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Patents'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Patents',
        data: patentsValuePerYear

    }]
});
                    

                    



                });

        }


        refresh();

    }]);
