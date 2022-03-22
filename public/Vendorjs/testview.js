app.controller("testview", function($scope, $filter, $http, $interval) {
    $scope.number;
    var initload = function() {
        $scope.$emit("SendUp", "1");
        var PipelineData = {};

        $http
            .post("./vendor/userslist/init", JSON.stringify(PipelineData))
            .then(
                function(response) {
                    if (response.data) {
                        $scope.items = response.data.data;
                        $scope.number = response.data.sequence;

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
    /////////////////////// Table Functions /////////////////////////////////

    ////////
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
        $scope.filteredItems = $filter("filter")($scope.items, function(item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query)) return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== "") {
            $scope.filteredItems = $filter("orderBy")(
                $scope.filteredItems,
                $scope.sort.sortingOrder,
                $scope.sort.reverse
            );
        }
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
    $scope.crud = function(value, type) {
        $scope.register.name = value.name;
        $scope.register.type = type;
        global_sequence = value.id;
    };
    $scope.guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        $scope.register.username =
            $scope.register.name + $scope.number + s4() + s4();
        return null;
    };
    $scope.vendorhistorycontrol = function(value) {
        if ($scope.vendorregister6) {
            $scope.vendorregister6 = false;
        } else {
            $scope.vendorregister6 = true;
            $scope.vendorhistory(value);
        }
    };

    $scope.registervendro = function() {
        var PipelineData = {
            data: $scope.register,
            sequence: global_sequence,
        };
        $http.post("./vendor/usersregister", JSON.stringify(PipelineData)).then(
            function(response) {
                if (response.data) {
                    $scope.alertmessage = response.data;
                    initload();
                } else {
                    $scope.alertmessage =
                        "Proper Data Not Obtained. Check Server.";
                    $scope.alertboxjs = {
                        display: "block",
                        background: "darkred",
                        color: "white",
                    };
                }
                $scope.register = {
                    name: "",
                    username: "",
                    email: "",
                    password: "",
                    type: "",
                    balance: "",
                    detail: "",
                };
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
    $scope.vendorhistory = function(value, type) {
        $scope.register.name = value.name;
        var PipelineData = {
            sequence: value.id,
            type: type,
        };

        $http.post("./vendor/userhistory", JSON.stringify(PipelineData)).then(
            function(response) {
                if (response.data) {
                    $scope.histroy = response.data.data;
                    console.log(response.data.name);
                    console.log($scope.histroy);
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
    $scope.t = [{ "id": 13, "name": "user", "username": "19-11-13-13-26-38", "email": " ", "email_verified_at": null, "password": "$2y$10$.lYbJ5xbSYaXYAaiR85u.OBWRuVZ2VuI6HpJak8OOmnVaExV8RdhS", "role": "user", "last_seen": null, "firstlog": "yes", "amount": "100", "reward": "0", "revert": 1, "revertamount": "100", "ban": "active", "remember_token": null, "created_at": "2021-12-12 10:10:53", "updated_at": "2021-12-12 10:23:58", "status": "Offline" }, { "id": 14, "name": "userrr", "username": "92-11-14-39-77-66", "email": " ", "email_verified_at": null, "password": "$2y$10$yMNiyssQmlRAkIuFMgfGr.CBum6HNlsjZeWVTzwkCd4FcRoKpVn/G", "role": "user", "last_seen": null, "firstlog": "yes", "amount": "100", "reward": "0", "revert": 1, "revertamount": "100", "ban": "active", "remember_token": null, "created_at": "2021-12-12 10:27:21", "updated_at": "2021-12-12 10:27:21", "status": "Offline" }];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.search();
    initload();
});