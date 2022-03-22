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
                templateUrl: './Vendor/VendorHome.blade.php',
                controller: 'VendorHome'
            }).when("/accounthistory", {
                templateUrl: './Vendor/AccountHistory.blade.php',
                controller: 'Accounthistory'
            }).when("/transctionhistory", {
                templateUrl: './Vendor/Transctionhistory.blade.php',
                controller: 'transctionhistory'
            })
            .when("/HowToDownload", {
                templateUrl: './Vendor/HowToDownload.blade.php',
                controller: 'HowToDownload'
            })
            .when("/SendSmsLink", {
                templateUrl: './Vendor/SendSmsLink.blade.php',
                controller: 'SendSmsLink'
            }).when("/accountreport", {
                templateUrl: './Vendor/AccountReport.blade.php',
                controller: 'AccountReport'
            }).when("/accountdispute", {
                templateUrl: './Vendor/AccountDisputes.blade.php',
                controller: 'AccountDisputes'
            }).when("/testview", {
                templateUrl: './Vendor/testview.blade.php',
                controller: 'testview'
            });



    }
]);
app.run(function($rootScope) {
    $rootScope.color = 'blue';
});