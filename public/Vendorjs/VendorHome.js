app.controller("VendorHome", function($scope, $filter, $http, $interval) {
    $scope.number;
    $scope.uname = uname;
    $scope.bounce = false;
    var sideBar = document.querySelector(".sidebar");
    sideBar.classList.remove("active");
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
    $scope.crud = function(value, type) {
        $scope.register.name = value.name;
        $scope.register.type = type;
        global_sequence = value.id;
    };
    $scope.vendorhistorycontrol = function(value) {
        $scope.register.type = value;
        $scope.registervendro();
    };
    $scope.registervendro = function() {
        console.log($scope.bounce);
        var PipelineData = {
            data: $scope.register,
            sequence: global_sequence,
            bounce: $scope.bounce,
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
    $scope.copyToClipboard = function(name) {
        var copyElement = document.createElement("textarea");
        copyElement.style.position = 'fixed';
        copyElement.style.opacity = '0';
        copyElement.textContent = decodeURI(name);
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(copyElement);
        copyElement.select();
        document.execCommand('copy');
        body.removeChild(copyElement);
    }
    $scope.userhist = function(item) {
            global_sequence = item.id
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.search();
    initload();
});