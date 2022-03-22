app.controller("VendorHome", function($scope, $filter, $http, $interval) {
    $scope.number;
    $scope.uname = uname;
    var sideBar = document.querySelector(".sidebar");
    sideBar.classList.remove("active");
    var initload = function() {
        $scope.$emit("SendUp", "1");
        var PipelineData = {};
        $http
            .post("./subadmin/vendorslist/init", JSON.stringify(PipelineData))
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
    var pageNum = 0;
    $scope.myValue = 10;
    $scope.gap = 5;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 10;
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
    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// Table Functions /////////////////////////////////

    ////////
    $scope.myFunc = function() {
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
        console.log(type);
        switch (type) {
            case "clear":
                $scope.register.name = value.name;
                $scope.register.type = "clear";
                global_sequence = value.id;
                break;
            case "create":
                $scope.register.type = "create";
                global_sequence = value.id;
                break;
            case "edit":
                $scope.register.name = value.name;
                $scope.register.username = value.username;
                $scope.register.email = value.email;
                global_sequence = value.id;
                $scope.register.type = "edit";
                break;
            case "delete":
                $scope.register.name = value.name;
                $scope.register.type = "delete";
                global_sequence = value.id;
                break;
            case "pass":
                $scope.register.name = value.name;
                $scope.register.type = "pass";
                global_sequence = value.id;
                break;
            case "balance":
                $scope.register.name = value.name;
                $scope.register.type = "balance";
                global_sequence = value.id;
                console.log(type);
                break;
            case "bonus":
                $scope.register.name = value.name;
                $scope.register.type = "bonus";
                global_sequence = value.id;
                $scope.register.balance = value.bounceback;
                break;
            case "rbalance":
                $scope.register.name = value.name;
                $scope.register.type = "rbalance";
                global_sequence = value.id;
                break;
            case "withdrawal":
                $scope.register.name = value.name;
                $scope.register.type = "withdrawal";
                global_sequence = value.id;
                break;
            default:
        }
    };
    $scope.vendoru = function(item) {
        global_sequence = item.id;
    }
    $scope.guid = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        $scope.register.username =
            $scope.number + $scope.register.name + s4() + s4();
        return null;
    };
    $scope.registervendro = function() {
        console.log($scope.register);
        console.log(global_sequence);
        var PipelineData = {
            data: $scope.register,
            sequence: global_sequence,
        };
        $http
            .post("./subadmin/vendorsregister", JSON.stringify(PipelineData))
            .then(
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

        $http.post("./admin/vendorhistory", JSON.stringify(PipelineData)).then(
            function(response) {
                if (response.data) {
                    $scope.histroy = response.data.data;
                    $scope.name = response.data.name[0];
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
    $scope.setsequence = function(item) {
        global_sequence = item.id
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
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.search();
    initload();
});