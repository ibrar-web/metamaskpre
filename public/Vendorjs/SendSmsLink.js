app.controller("SendSmsLink", function($scope, $filter, $http, $interval) {
    $scope.uname = uname;
    var sideBar = document.querySelector(".sidebar");
    sideBar.classList.remove("active");
    $scope.toggleMenu = function() {

        if (sideBar.classList.contains('active')) {
            sideBar.classList.remove("active");
            $scope.myStyle = {
                "left": "-100%"
            }
        } else {
            console.log('remove');
            $scope.myStyle = {
                "left": "0%"
            }
            sideBar.classList.add("active");
        }

    }
});