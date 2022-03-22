app.controller("Accounthistory", function($scope, $filter, $http, $interval) {
    $scope.number;
    var sideBar = document.querySelector(".sidebar");
    sideBar.classList.remove("active");
    $scope.uname = uname;
    var initload = function() {
        var PipelineData = {
            sequence: global_sequence
        };
        $http
            .post("./vendor/vendorhistory/init", JSON.stringify(PipelineData))
            .then(
                function(response) {
                    if (response.data) {
                        $scope.items = response.data.data;
                        data = $scope.items;
                        $scope.search();
                        $scope.c = response.data.c[0];
                    } else {
                        $scope.alertmessage =
                            "Proper Data Not Obtained. Check Server.";
                        $scope.alertboxjs = {
                            display: "block",
                            background: "darkred",
                            color: "white",
                        };
                    }
                },
                function(response) {
                    $scope.alertmessage = "Server Error!!!.";
                    $scope.alertboxjs = {
                        display: "block",
                        background: "black",
                        color: "white",
                    };
                }
            );
    };

    //////////////////////Variable Defination ///////////////////////
    $scope.items = [];
    var timer = false;
    var pageNum = 0;
    $scope.myValue = 10;
    var data = [];
    var datafiltered = [];
    $scope.gap = 5;
    $scope.name = name;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.sort = {
        sortingOrder: "id",
        reverse: false,
    };
    $scope.serverMessage = "none";
    $scope.register = {
        name: "",
        username: "",
        email: "",
        password: "",
        type: "",
        balance: "",
        detail: "",
        status: "",
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.myFunc = function() {
        $scope.itemsPerPage = $scope.itemsPerPage;
        $scope.search();
    };
    ////////
    var searchMatch = function(haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    ////////
    $scope.search = function() {
        $scope.filteredItems = $filter('filter')($scope.items, function(item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        // if ($scope.sort.sortingOrder !== '') {
        //     $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        // }
        console.log($scope.items)
        console.log($scope.filteredItems);
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };
    ////////////
    $scope.groupToPages = function() {
        $scope.pagedItems = [];
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [
                    $scope.filteredItems[i],
                ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push(
                    $scope.filteredItems[i]
                );
            }
        }
    };
    ////////////
    $scope.range = function(size, start, end) {
        var ret = [];
        if (size < end) {
            end = size;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    ////////////
    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    ///////////////
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    //////////////
    $scope.setPage = function() {
        $scope.currentPage = this.n;
    };
    $scope.filterdata = function() {
        $scope.items = [];
        let from = $scope.from;
        let till = $scope.till;
        for (var i = 0; i < data.length; i++) {
            let date1 = new Date(`${data[i]['created_at']}`);
            date1.setHours(0, 0, 0, 0);
            console.log($scope.from.setHours(0, 0, 0, 0));
            if (date1.getTime() >= from.getTime() && date1.getTime() <= till.getTime()) {
                $scope.items.push(data[i]);
            }
        }
        console.log($scope.items);
        console.log('$scope.items');
        $scope.search();
    }
    $scope.reset = function() {
        $scope.items = data;
        $scope.search();
    }
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
    initload();
});