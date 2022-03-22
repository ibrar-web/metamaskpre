var app = angular.module('myApp', ["ngRoute", 'ngAnimate'], function($interpolateProvider) {
        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');

    })
    .controller('mainbody', ['$scope', '$interval', '$http', function($scope, $interval, $http) {
        $scope.main = 'main';
        $scope.init = 'topbar';
    }]);

app.directive('customOnChange', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var onChangeFunc = scope.$eval(attrs.customOnChange);
            element.bind('change', onChangeFunc);
        }
    };
});

app.config(['$routeProvider',

    function($routeProvider) {
        $routeProvider.

        when("/", {
                templateUrl: './Subadmin/VendorHome.blade.php',
                controller: 'VendorHome'
            }).when("/accounthistory", {
                templateUrl: './Subadmin/AccountHistory.blade.php',
                controller: 'Accounthistory'
            }).when("/transctionhistory", {
                templateUrl: './Subadmin/Transctionhistory.blade.php',
                controller: 'transctionhistory'
            })
           .when("/accountreport", {
                templateUrl: './Subadmin/AccountReport.blade.php',
                controller: 'AccountReport'
            }).when("/accountdispute", {
                templateUrl: './Subadmin/AccountDisputes.blade.php',
                controller: 'AccountDisputes'
            });



    }
]);
app.run(function($rootScope) {
    $rootScope.color = 'blue';
});