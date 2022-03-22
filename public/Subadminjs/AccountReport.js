app.controller("AccountReport", function($scope, $filter, $http, $interval) {
    $scope.number;
    var sideBar = document.querySelector(".sidebar");
    sideBar.classList.remove("active");
    $scope.uname = uname;
    $scope.header = ['Id', 'Account', 'deposit', 'Bounceback', 'Redeems', 'Profit', "Payout", 'Created At', 'Updated'];
    var initload = function() {
        var PipelineData = {};
        $http
            .post("./vendor/vendorreport/init", JSON.stringify(PipelineData))
            .then(
                function(response) {
                    if (response.data) {
                        $scope.items = response.data.data;
                        data = $scope.items;
                        for (let i = 0; i < $scope.items.length; i++) {
                            $scope.deposit = $scope.deposit + $scope.items[i]['deposit'];
                            $scope.Bounceback = $scope.Bounceback + $scope.items[i]['Bounceback'];
                            $scope.Redeems = $scope.Redeems + $scope.items[i]['Redeems'];
                            $scope.profit = $scope.profit + $scope.items[i]['profit'];
                            $scope.payout = $scope.payout + $scope.items[i]['payout'];
                        }
                        $scope.payout = $scope.payout / $scope.items.length;
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
    var data = [];
    $scope.myValue = 10;
    $scope.gap = 5;
    $scope.name = name;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 20;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.deposit = 0;
    $scope.Bounceback = 0;
    $scope.Redeems = 0;
    $scope.profit = 0;
    $scope.payout = 0;
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
    $scope.print = function() {
        JSONToCSVConvertor($scope.items, "Vehicle Report", true);
    }


    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = [];
        arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        //CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in $scope.header) {

                //Now convert each value to string and comma-seprated
                row += $scope.header[index] + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {

                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name

        var fileName = `Transction Report`;
        //this will remove the blank-spaces from the title and replace it with an underscore
        //fileName += ReportTitle.replace(/ /g,"_");   

        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    $scope.search();
    initload();
});